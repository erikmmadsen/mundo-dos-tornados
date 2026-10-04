// ---------- Radar do tempo: previsão de 3 dias ----------
// Dados reais do Open-Meteo (gratuito, sem chave). Pedimos uma grade de pontos que cobre
// toda a área visível do mapa e desenhamos a previsão hora a hora sobre ele.
// O mapa fica travado no lugar pesquisado (sem arrastar nem zoom): é um único pedido de
// dados por busca, o que economiza internet.

const COLS = 10;            // pontos da grade na horizontal
const ROWS = 7;             // pontos da grade na vertical
const HORAS = 72;           // 3 dias

const radarStatusEl = document.getElementById("radar-status");
const radarHoraEl = document.getElementById("radar-hora");
const radarHoraTxtEl = document.getElementById("radar-hora-txt");
const radarPlayEl = document.getElementById("radar-play");
const radarResumoEl = document.getElementById("radar-resumo");
const radarAbasEl = document.getElementById("radar-abas");

// Cada camada: campo da API, cores por faixa de valor e unidade
const camadasRadar = [
  { id: "chuva", nome: "🌧️ Chuva", campo: "precipitation", unidade: "mm/h",
    faixas: [[0.1, "#86efac"], [1, "#22c55e"], [2.5, "#facc15"], [5, "#f97316"], [10, "#ef4444"], [20, "#d946ef"]] },
  { id: "vento", nome: "💨 Vento (rajadas)", campo: "wind_gusts_10m", unidade: "km/h",
    faixas: [[20, "#bae6fd"], [40, "#38bdf8"], [60, "#facc15"], [80, "#f97316"], [100, "#ef4444"], [120, "#d946ef"]] },
  { id: "tempestade", nome: "⛈️ Energia de tempestade (CAPE)", campo: "cape", unidade: "J/kg",
    faixas: [[250, "#fde68a"], [750, "#facc15"], [1500, "#f97316"], [2500, "#ef4444"], [3500, "#d946ef"]] }
];

let camadaAtual = camadasRadar[0];
let previsao = null;        // { horas, pontos (grade), cidade: { lat, lon, nome, h }, limites }
let cidade = null;          // lugar pesquisado: { lat, lon, nome }
let requisicao = 0;         // descarta respostas antigas
let mapa = null;
let overlay = null;
let marcador = null;
let setasLayer = null;
let timer = null;

// ---- cores ----
function hexParaRgb(hex) {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function corDoValor(camada, v) {
  const f = camada.faixas;
  if (v < f[0][0]) return null;
  let i = 0;
  while (i < f.length - 1 && v >= f[i + 1][0]) i++;
  return hexParaRgb(f[i][1]);
}

function desenharLegenda() {
  const f = camadaAtual.faixas;
  const passos = f.map(function (x, i) { return x[1] + " " + Math.round(i * 100 / f.length) + "% " + Math.round((i + 1) * 100 / f.length) + "%"; });
  document.getElementById("radar-barra").style.background = "linear-gradient(90deg, " + passos.join(", ") + ")";
  document.getElementById("radar-unidade").textContent = camadaAtual.unidade;
  document.getElementById("radar-min").textContent = f[0][0];
  document.getElementById("radar-max").textContent = f[f.length - 1][0] + "+";
}

// ---- dados ----
function envolverLon(lon) {
  return ((lon + 540) % 360) - 180;
}

// Grade COLS x ROWS sobre a área. As linhas ficam espaçadas na projeção do mapa (Mercator),
// que é como o Leaflet estica a imagem entre os cantos.
function listaDePontos(sul, norte, oeste, leste) {
  const proj = L.Projection.SphericalMercator;
  const ySul = proj.project(L.latLng(sul, 0)).y;
  const yNorte = proj.project(L.latLng(norte, 0)).y;
  const lats = [];
  const lons = [];
  for (let i = 0; i < ROWS; i++) {            // i = 0 é o norte
    const lat = proj.unproject(L.point(0, yNorte + (ySul - yNorte) * i / (ROWS - 1))).lat;
    for (let j = 0; j < COLS; j++) {
      lats.push(+lat.toFixed(3));
      lons.push(+envolverLon(oeste + (leste - oeste) * j / (COLS - 1)).toFixed(3));
    }
  }
  return { lats: lats, lons: lons };
}

// Pede a grade da área visível (mais a cidade pesquisada, para o resumo por dia).
async function carregarGrade() {
  if (!mapa || !cidade) return;
  const b = mapa.getBounds();
  const sul = Math.max(-80, b.getSouth());
  const norte = Math.min(80, b.getNorth());
  const oeste = b.getWest();
  const leste = b.getEast();
  const minha = ++requisicao;

  const p = listaDePontos(sul, norte, oeste, leste);
  p.lats.push(cidade.lat);
  p.lons.push(cidade.lon);
  const url = "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + p.lats.join(",") + "&longitude=" + p.lons.join(",") +
    "&hourly=precipitation,wind_gusts_10m,wind_speed_10m,wind_direction_10m,cape,temperature_2m" +
    "&forecast_days=3&timezone=auto&wind_speed_unit=kmh";
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    let dados = await resp.json();
    if (!Array.isArray(dados)) dados = [dados];
    if (minha !== requisicao) return;           // chegou uma resposta mais nova
    const total = ROWS * COLS;
    const pontos = dados.slice(0, total).map(function (d, k) {
      return { lat: p.lats[k], lon: p.lons[k], h: d.hourly };
    });
    const eu = dados[total];
    previsao = {
      cidade: { lat: cidade.lat, lon: cidade.lon, nome: cidade.nome, h: eu.hourly },
      horas: eu.hourly.time.slice(0, HORAS),
      pontos: pontos,
      limites: [[sul, oeste], [norte, leste]],
      deslocamento: eu.utc_offset_seconds || 0
    };
    radarStatusEl.textContent = "Previsão para " + cidade.nome + " (atualizada agora).";
    mostrarGrade();
  } catch (erro) {
    if (minha !== requisicao) return;
    radarStatusEl.textContent = "Não foi possível carregar a previsão. Verifique a internet e tente de novo.";
  }
}

function buscarPrevisao(lat, lon, nome) {
  if (typeof L === "undefined") return;
  cidade = { lat: lat, lon: lon, nome: nome };
  radarStatusEl.textContent = "Carregando previsão para " + nome + "...";
  criarMapa();
  mapa.setView([lat, lon], 6, { animate: false });
  if (marcador) mapa.removeLayer(marcador);
  marcador = L.marker([lat, lon]).addTo(mapa).bindPopup(nome);
  carregarGrade();
}

// ---- desenho no mapa ----
function valorNaGrade(campo, hora, x, y) {
  // x em [0, COLS - 1], y em [0, ROWS - 1]; interpolação entre os 4 pontos vizinhos
  const x0 = Math.min(Math.floor(x), COLS - 2);
  const y0 = Math.min(Math.floor(y), ROWS - 2);
  // interpolação suave (cosseno), evita o aspecto quadriculado
  const fx = (1 - Math.cos((x - x0) * Math.PI)) / 2;
  const fy = (1 - Math.cos((y - y0) * Math.PI)) / 2;
  function v(i, j) { return previsao.pontos[i * COLS + j].h[campo][hora] || 0; }
  return v(y0, x0) * (1 - fx) * (1 - fy) + v(y0, x0 + 1) * fx * (1 - fy) +
    v(y0 + 1, x0) * (1 - fx) * fy + v(y0 + 1, x0 + 1) * fx * fy;
}

const RES_X = 240;
const RES_Y = 120;
const canvasRadar = document.createElement("canvas");
canvasRadar.width = RES_X;
canvasRadar.height = RES_Y;

function desenharHora(hora) {
  if (!previsao || !mapa) return;
  const c = canvasRadar.getContext("2d");
  const img = c.createImageData(RES_X, RES_Y);
  for (let py = 0; py < RES_Y; py++) {
    for (let px = 0; px < RES_X; px++) {
      const v = valorNaGrade(camadaAtual.campo, hora, px / (RES_X - 1) * (COLS - 1), py / (RES_Y - 1) * (ROWS - 1));
      const cor = corDoValor(camadaAtual, v);
      const k = (py * RES_X + px) * 4;
      if (cor) {
        // transparência cresce com a intensidade e some perto das bordas da grade
        const lim = camadaAtual.faixas[0][0];
        const rampa = Math.min(1, (v - lim) / (lim * 1.5) + 0.25);
        const borda = Math.min(1, Math.min(px, py, RES_X - 1 - px, RES_Y - 1 - py) / (RES_Y * 0.08));
        img.data[k] = cor[0]; img.data[k + 1] = cor[1]; img.data[k + 2] = cor[2];
        img.data[k + 3] = Math.round(185 * rampa * borda * borda);
      }
    }
  }
  c.putImageData(img, 0, 0);
  const url = canvasRadar.toDataURL();
  if (overlay) overlay.setUrl(url);

  // setas de vento
  setasLayer.clearLayers();
  if (camadaAtual.id === "vento") {
    previsao.pontos.forEach(function (pt) {
      const vel = pt.h.wind_speed_10m[hora] || 0;
      const dir = pt.h.wind_direction_10m[hora] || 0;
      const icone = L.divIcon({
        className: "",
        html: '<div class="seta-vento" style="transform: rotate(' + (dir + 180) + 'deg); opacity:' +
          Math.min(1, 0.5 + vel / 60) + '">➤</div>',
        iconSize: [18, 18]
      });
      L.marker([pt.lat, pt.lon], { icon: icone, interactive: false }).addTo(setasLayer);
    });
  }

  radarHoraTxtEl.textContent = formatarHora(previsao.horas[hora]);
}

function formatarHora(iso) {
  const dias = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const d = new Date(iso + ":00");   // horário local da cidade, sem fuso
  return dias[d.getDay()] + " " + String(d.getDate()).padStart(2, "0") + "/" +
    String(d.getMonth() + 1).padStart(2, "0") + " " + String(d.getHours()).padStart(2, "0") + "h";
}

function horaAtual() {
  const agoraLocal = new Date(Date.now() + previsao.deslocamento * 1000).toISOString().slice(0, 13);
  const i = previsao.horas.findIndex(function (h) { return h.slice(0, 13) === agoraLocal; });
  return i >= 0 ? i : 0;
}

// ---- resumo por dia (cidade pesquisada) ----
function nivelDeRisco(cape, rajada) {
  if (cape >= 2000 && rajada >= 70) return { texto: "⚠️ Alto: tempestades severas possíveis", cor: "#e74c3c" };
  if (cape >= 1000 && rajada >= 60) return { texto: "🟠 Moderado: pancadas fortes", cor: "#e67e22" };
  if (cape >= 500 && rajada >= 40) return { texto: "🟡 Atenção: instabilidade", cor: "#f1c40f" };
  return { texto: "🟢 Baixo", cor: "#27ae60" };
}

// hora (e valor) do maior valor de um campo dentro do dia
function picoDoDia(campo, ini) {
  const fatia = previsao.cidade.h[campo].slice(ini, ini + 24);
  let melhor = 0;
  fatia.forEach(function (v, i) { if (v > fatia[melhor]) melhor = i; });
  return { valor: fatia[melhor] || 0, hora: ini + melhor };
}

function desenharResumo() {
  const centro = previsao.cidade.h;
  radarResumoEl.innerHTML = "";
  for (let d = 0; d < 3; d++) {
    const ini = d * 24;
    const fim = ini + 24;
    const fatia = function (campo) { return centro[campo].slice(ini, fim).filter(function (v) { return v !== null; }); };
    const temp = fatia("temperature_2m");
    const chuva = fatia("precipitation").reduce(function (a, b) { return a + b; }, 0);
    const rajada = Math.max.apply(null, fatia("wind_gusts_10m"));
    const cape = Math.max.apply(null, fatia("cape"));
    const risco = nivelDeRisco(cape, rajada);
    const picoChuva = picoDoDia("precipitation", ini);
    const picoRajada = picoDoDia("wind_gusts_10m", ini);
    const hora = function (i) { return previsao.horas[i].slice(11, 13) + "h"; };
    const caixa = document.createElement("div");
    caixa.className = "radar-dia";
    caixa.style.borderLeftColor = risco.cor;
    caixa.innerHTML =
      "<h4>" + (d === 0 ? "Hoje" : d === 1 ? "Amanhã" : "Depois de amanhã") + " · " + formatarHora(previsao.horas[ini]).slice(0, 9) + "</h4>" +
      "<p>🌡️ " + Math.round(Math.min.apply(null, temp)) + "° a " + Math.round(Math.max.apply(null, temp)) + "°C</p>" +
      "<p>🌧️ Chuva: " + chuva.toFixed(1) + " mm</p>" +
      (picoChuva.valor >= 0.1 ? "<p>⏱️ Pico da chuva: " + hora(picoChuva.hora) + " (" + picoChuva.valor.toFixed(1) + " mm/h)</p>" : "") +
      "<p>💨 Rajada máxima: " + Math.round(rajada) + " km/h às " + hora(picoRajada.hora) + "</p>" +
      "<p>⛈️ Risco de tempestade forte: " + risco.texto + "</p>";
    radarResumoEl.appendChild(caixa);
  }
}

// ---- mapa e controles ----
function criarMapa() {
  if (mapa) return;
  // travado: sem arrastar, zoom, teclado nem botões de zoom
  mapa = L.map("radar-mapa", {
    zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false,
    boxZoom: false, keyboard: false, touchZoom: false, zoomSnap: 0
  });
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles © Esri", maxZoom: 12
  }).addTo(mapa);
  setasLayer = L.layerGroup().addTo(mapa);
}

function mostrarGrade() {
  if (!overlay) overlay = L.imageOverlay(canvasRadar.toDataURL(), previsao.limites, { opacity: 1 }).addTo(mapa);
  else overlay.setBounds(previsao.limites);
  radarHoraEl.max = previsao.horas.length - 1;
  radarHoraEl.value = horaAtual();
  desenharLegenda();
  desenharResumo();
  desenharHora(+radarHoraEl.value);
}

function parar() {
  clearInterval(timer);
  timer = null;
  radarPlayEl.textContent = "▶";
}

radarPlayEl.addEventListener("click", function () {
  if (timer) { parar(); return; }
  radarPlayEl.textContent = "⏸";
  timer = setInterval(function () {
    const prox = (+radarHoraEl.value + 1) % previsao.horas.length;
    radarHoraEl.value = prox;
    desenharHora(prox);
  }, 300);
});

radarHoraEl.addEventListener("input", function () {
  parar();
  desenharHora(+radarHoraEl.value);
});

camadasRadar.forEach(function (cam) {
  const b = document.createElement("button");
  b.className = "radar-aba" + (cam === camadaAtual ? " ativo" : "");
  b.textContent = cam.nome;
  b.addEventListener("click", function () {
    radarAbasEl.querySelectorAll(".radar-aba").forEach(function (x) { x.classList.remove("ativo"); });
    b.classList.add("ativo");
    camadaAtual = cam;
    desenharLegenda();
    if (previsao) desenharHora(+radarHoraEl.value);
  });
  radarAbasEl.appendChild(b);
});

// ---- busca de cidade e localização ----
async function buscarCidade() {
  const nome = document.getElementById("radar-cidade").value.trim();
  if (!nome) {
    radarStatusEl.textContent = "Digite o nome de uma cidade para buscar.";
    return;
  }
  radarStatusEl.textContent = "Procurando " + nome + "...";
  try {
    const resp = await fetch("https://geocoding-api.open-meteo.com/v1/search?count=1&language=pt&name=" +
      encodeURIComponent(nome));
    const dados = await resp.json();
    if (!dados.results || !dados.results.length) {
      radarStatusEl.textContent = "Cidade não encontrada. Tente outro nome.";
      return;
    }
    const r = dados.results[0];
    buscarPrevisao(r.latitude, r.longitude, r.name + (r.admin1 ? " - " + r.admin1 : ""));
  } catch (erro) {
    radarStatusEl.textContent = "Não foi possível buscar a cidade. Tente de novo.";
  }
}

document.getElementById("radar-buscar").addEventListener("click", buscarCidade);
document.getElementById("radar-cidade").addEventListener("keydown", function (e) {
  if (e.key === "Enter") buscarCidade();
});
document.getElementById("radar-local").addEventListener("click", function () {
  if (!navigator.geolocation) {
    radarStatusEl.textContent = "Seu navegador não permite obter a localização.";
    return;
  }
  radarStatusEl.textContent = "Obtendo sua localização...";
  navigator.geolocation.getCurrentPosition(function (pos) {
    buscarPrevisao(pos.coords.latitude, pos.coords.longitude, "sua localização");
  }, function () {
    radarStatusEl.textContent = "Não foi possível obter a localização. Digite uma cidade.";
  });
});

// Começa em Xanxerê (SC), cidade atingida por um tornado em 2015
if (typeof L === "undefined") {
  radarStatusEl.textContent = "Não foi possível carregar o mapa. Verifique a internet e recarregue a página.";
} else buscarPrevisao(-26.877, -52.404, "Xanxerê - Santa Catarina");
