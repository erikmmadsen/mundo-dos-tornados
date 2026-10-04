// Dados das categorias (Escala Fujita Melhorada)
const categorias = [
  { nome: "EF0", texto: "#0f1b2d", vento: "105 a 137 km/h", cor: "#27ae60", dano: "Fraco",
    efeito: "Quebra galhos de árvores e derruba placas." },
  { nome: "EF1", texto: "#0f1b2d", vento: "138 a 177 km/h", cor: "#2ecc71", dano: "Moderado",
    efeito: "Arranca telhas e pode virar carros pequenos." },
  { nome: "EF2", texto: "#0f1b2d", vento: "178 a 217 km/h", cor: "#f1c40f", dano: "Considerável",
    efeito: "Destrói telhados e derruba árvores grandes." },
  { nome: "EF3", texto: "#0f1b2d", vento: "218 a 266 km/h", cor: "#e67e22", dano: "Severo",
    efeito: "Derruba paredes de casas e vira trens." },
  { nome: "EF4", texto: "#ffffff", vento: "267 a 322 km/h", cor: "#e74c3c", dano: "Devastador",
    efeito: "Destrói casas bem construídas e joga carros longe." },
  { nome: "EF5", texto: "#ffffff", vento: "mais de 322 km/h", cor: "#8e44ad", dano: "Incrível",
    efeito: "Destrói quase tudo. É raríssimo!" }
];

// Tornados históricos
const historia = [
  { ano: 1925, nome: "Tornado Tri-State (EUA)",
    texto: "Percorreu cerca de 352 km em 3 estados e causou 695 mortes. É o mais mortal da história dos EUA." },
  { ano: 1974, nome: "Super Surto de Tornados (EUA)",
    texto: "Em 2 dias, 148 tornados atingiram 13 estados americanos." },
  { ano: 1989, nome: "Tornado de Daulatpur-Saturia (Bangladesh)",
    texto: "Considerado o tornado mais mortal já registrado, com cerca de 1.300 mortes." },
  { ano: 1999, nome: "Tornado de Bridge Creek-Moore (EUA)",
    texto: "Radares mediram vento de cerca de 484 km/h, o mais rápido já medido na Terra." },
  { ano: 2011, nome: "Tornado de Joplin (EUA)",
    texto: "Um EF5 que atingiu a cidade de Joplin, no Missouri, e causou 158 mortes." },
  { ano: 2013, nome: "Tornado de El Reno (EUA)",
    texto: "O mais largo já registrado: cerca de 4 km de largura!" },
  { ano: 2015, nome: "Tornado de Xanxerê (Brasil)",
    texto: "Atingiu a cidade de Xanxerê, em Santa Catarina, e deixou muitos feridos." }
];

// Tornado mais forte (ou mais devastador) de cada região. As classificações de tornados antigos
// são estimativas feitas depois do evento e podem variar conforme a fonte.
const regioes = [
  { regiao: "América do Norte", emoji: "🌎", nome: "Bridge Creek-Moore, Oklahoma (EUA)", data: "3 de maio de 1999", nivel: "F5",
    texto: "Radar Doppler mediu cerca de 484 km/h, o vento mais rápido já registrado na Terra." },
  { regiao: "América do Sul", emoji: "🌎", nome: "San Justo, Santa Fe (Argentina)", data: "10 de janeiro de 1973", nivel: "F5",
    texto: "Considerado o tornado mais forte do Hemisfério Sul, com cerca de 63 mortes." },
  { regiao: "Brasil", emoji: "📍", nome: "Itu, São Paulo", data: "24 de maio de 1991", nivel: "F4",
    texto: "Um dos mais violentos já registrados no país, com ventos de até cerca de 300 km/h e 15 mortes." },
  { regiao: "Brasil (mais recente)", emoji: "📍", nome: "Rio Bonito do Iguaçu, Paraná", data: "7 de novembro de 2025", nivel: "F4",
    texto: "O Simepar elevou a classificação para F4, com ventos acima de 300 km/h. Destruiu boa parte da área urbana." },
  { regiao: "Europa", emoji: "🌍", nome: "Palluel (França)", data: "24 de junho de 1967", nivel: "F5",
    texto: "A maior classificação já atribuída a um tornado europeu. Em 2021, um tornado IF4 na Morávia do Sul (Tchéquia) matou 6 pessoas." },
  { regiao: "Ásia", emoji: "🌏", nome: "Daulatpur-Saturia (Bangladesh)", data: "26 de abril de 1989", nivel: "F3 a F5",
    texto: "O mais mortal da história, com cerca de 1.300 mortes. A força varia conforme a fonte: de F3 a F5." },
  { regiao: "África", emoji: "🌍", nome: "oThongathi/Tongaat, KwaZulu-Natal (África do Sul)", data: "3 de junho de 2024", nivel: "EF3",
    texto: "Um dos mais fortes confirmados no continente. Os tornados daquele dia deixaram pelo menos 11 mortos." },
  { regiao: "Oceania (Austrália)", emoji: "🌏", nome: "Bowen, Queensland", data: "1876", nivel: "F5",
    texto: "O único tornado australiano classificado como F5, com vento estimado em pelo menos 420 km/h." },
  { regiao: "Oceania (Nova Zelândia)", emoji: "🌏", nome: "Frankton, Hamilton", data: "3 de agosto de 1948", nivel: "EF3",
    texto: "O mais forte já conhecido na Nova Zelândia: danificou cerca de 200 construções e matou 3 pessoas." }
];

// Alertas de tempestade (cores do INMET/Defesa Civil) e alertas no celular da Defesa Civil.
// Limites de vento e chuva são referências gerais; os valores exatos variam por região.
const alertasCores = [
  { triangulo: "amarelo", cor: "#f1c40f", texto: "#1c2833", nome: "Amarelo", grau: "Perigo potencial", risco: "Baixo a moderado",
    fenomeno: "Ventos de 40 a 60 km/h e chuva de 20 a 30 mm/h (ou até 50 mm no dia).",
    significa: "Pode haver transtornos pontuais, como queda de galhos e alagamentos localizados, com pouca chance de danos graves.",
    fazer: "Acompanhe a previsão, evite ficar debaixo de árvores e cuide de objetos soltos." },
  { triangulo: "laranja", cor: "#e67e22", texto: "#1c2833", nome: "Laranja", grau: "Perigo", risco: "Alto",
    fenomeno: "Ventos de 60 a 100 km/h e chuva de 30 a 60 mm/h (ou 50 a 100 mm no dia).",
    significa: "Há risco de enxurradas, queda de árvores e postes, destelhamento e falta de energia.",
    fazer: "Evite sair, fique longe de árvores, postes e áreas alagáveis, e guarde o que o vento puder levar." },
  { triangulo: "vermelho", cor: "#e74c3c", texto: "#ffffff", nome: "Vermelho", grau: "Grande perigo", risco: "Muito alto",
    fenomeno: "Ventos acima de 100 km/h e chuva acima de 100 mm no dia.",
    significa: "Tempestade de intensidade excepcional, com risco alto de danos em construções, deslizamentos e inundações. Pode incluir tornados.",
    fazer: "Procure abrigo seguro e não saia. Em risco de tornado, vá para um cômodo interno, sem janelas, no andar mais baixo. Siga as ordens da Defesa Civil." }
];

const alertasCelular = [
  { simbolo: "🔔", cor: "#e67e22", texto: "#1c2833", nome: "Alerta severo", risco: "Alto",
    significa: "Situação de perigo grave, mas ainda sem urgência imediata. O aviso toca com um som curto.",
    fazer: "Prepare-se para sair da área de risco, se for preciso, e fique atento às novas mensagens." },
  { simbolo: "🚨", cor: "#e74c3c", texto: "#ffffff", nome: "Alerta extremo", risco: "Muito alto",
    significa: "Emergência com risco iminente à vida e aos bens. O celular toca uma sirene de cerca de 10 segundos, mesmo no silencioso.",
    fazer: "Proteja-se imediatamente: abrigue-se ou saia da área de risco, conforme a orientação da mensagem." }
];

// Mostra os botões das categorias
const listaEl = document.getElementById("lista-categorias");
const detalheEl = document.getElementById("detalhe-categoria");

categorias.forEach(function (cat, i) {
  const botao = document.createElement("button");
  botao.className = "card";
  botao.textContent = cat.nome;
  botao.style.background = cat.cor;
  botao.style.color = cat.texto;
  botao.addEventListener("click", function () { selecionarCategoria(i); });
  listaEl.appendChild(botao);
});

// ---------- Simulador de destruição ----------
// "nivel" é a menor categoria (0 = EF0) capaz de levantar o objeto.
const coisas = [
  { emoji: "🍃", nivel: 0, tam: 22, qtd: 8 },
  { emoji: "🍂", nivel: 0, tam: 22, qtd: 6 },
  { emoji: "📄", nivel: 0, tam: 20, qtd: 5 },
  { emoji: "🛍️", nivel: 0, tam: 22, qtd: 4 },
  { emoji: "🌿", nivel: 0, tam: 24, qtd: 4 },
  { emoji: "🪧", nivel: 0, tam: 28, qtd: 3 },
  { emoji: "🚲", nivel: 1, tam: 32, qtd: 3 },
  { emoji: "🚗", nivel: 2, tam: 40, qtd: 3 },
  { emoji: "🌳", nivel: 2, tam: 46, qtd: 3 },
  { emoji: "🏠", nivel: 3, tam: 56, qtd: 3 },
  { emoji: "🚂", nivel: 3, tam: 50, qtd: 1 },
  { emoji: "🏢", nivel: 4, tam: 64, qtd: 2 }
];

const simPausaEl = document.getElementById("sim-pausa");
const canvas = document.getElementById("sim-canvas");
const ctx = canvas.getContext("2d");
const LARGURA = canvas.width;
const ALTURA = canvas.height;
const CHAO = 330;          // onde ficam as coisas (com profundidade de até 50px)
const GRAVIDADE = 0.25;

let nivelSim = 0;
let objetos = [];
let tornado = { x: LARGURA / 2, tempo: 0 };
let animando = false;
let pausado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function criarObjetos() {
  objetos = [];
  coisas.forEach(function (c) {
    for (let i = 0; i < c.qtd; i++) {
      objetos.push({
        emoji: c.emoji, nivel: c.nivel, tam: c.tam,
        x: 30 + Math.random() * (LARGURA - 60),
        base: CHAO + Math.random() * 50,
        estado: "chao", ang: 0, raio: 0, alt: 0, subida: 0, vx: 0, vy: 0, y: 0, giro: 0
      });
    }
  });
  objetos.forEach(function (o) { o.y = o.base; });
}

function raioDoTornado() { return 70 + nivelSim * 18; }

function atualizarSim() {
  tornado.tempo++;
  tornado.x = LARGURA / 2 + Math.sin(tornado.tempo / 260) * LARGURA * 0.38;
  const raio = raioDoTornado();

  objetos.forEach(function (o) {
    if (o.estado === "chao") {
      const dx = o.x - tornado.x;
      o.tremor = 0;
      if (Math.abs(dx) < raio) {
        if (o.nivel <= nivelSim) {
          o.estado = "subindo";
          o.raio = Math.max(Math.abs(dx), 12);
          o.ang = dx < 0 ? Math.PI : 0;
          o.alt = 0;
          o.subida = 1.2 + Math.random() * 1.2 - o.nivel * 0.1;
          o.limite = 120 + Math.random() * 130;
        } else {
          o.tremor = 2;   // forte demais para levantar, só balança
        }
      }
    } else if (o.estado === "subindo") {
      o.ang += 0.12;
      o.alt += o.subida;
      o.giro += 0.2;
      o.x = tornado.x + Math.cos(o.ang) * o.raio;
      o.y = o.base - o.alt + Math.sin(o.ang) * o.raio * 0.15;
      if (o.alt > o.limite) {
        // solta o objeto para fora do tornado
        o.estado = "voo";
        o.vx = -Math.sin(o.ang) * 3 + (Math.random() - 0.5) * 2;
        o.vy = -1 - Math.random() * 2;
      }
    } else if (o.estado === "voo") {
      o.x += o.vx;
      o.y += o.vy;
      o.vy += GRAVIDADE;
      o.giro += 0.15;
      if (o.x < 10 || o.x > LARGURA - 10) o.vx *= -0.6;
      if (o.y >= o.base) {
        o.y = o.base;
        o.estado = "chao";
        o.giro = 0;
      }
    }
  });
}

// Funil em forma de cone invertido: largo no topo (t = 0) e estreito no chão (t = 1)
const TOPO_FUNIL = 58;
const BASE_FUNIL = CHAO + 25;

function larguraFunil(t) {
  const larguraBase = 6 + nivelSim * 3;
  const larguraTopo = raioDoTornado() * 0.95;
  return larguraBase + (larguraTopo - larguraBase) * Math.pow(1 - t, 1.7);
}

// Centro do funil em cada altura: balança no alto e se curva perto do chão
function centroFunil(t) {
  return tornado.x +
    Math.sin(tornado.tempo / 35 + t * 3) * 14 * (1 - t) +
    Math.sin(tornado.tempo / 90) * 26 * t * t;
}

function desenharNuvem() {
  // base escura da supercélula, com várias camadas
  for (let k = -5; k <= 5; k++) {
    const x = tornado.x + k * 62 + Math.sin(tornado.tempo / 70 + k) * 6;
    const y = 22 + Math.abs(k) * 5;
    ctx.fillStyle = "rgb(" + (38 + Math.abs(k) * 4) + ", " + (46 + Math.abs(k) * 4) + ", 58)";
    ctx.beginPath();
    ctx.ellipse(x, y, 82, 28, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  // nuvem-parede (wall cloud) logo acima do funil
  ctx.fillStyle = "rgb(30, 36, 46)";
  ctx.beginPath();
  ctx.ellipse(tornado.x, 52, larguraFunil(0) * 0.9 + 20, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  // chuva ao redor do funil
  ctx.strokeStyle = "rgb(110, 125, 145)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 40; i++) {
    const rx = tornado.x + ((i * 53 + tornado.tempo * 3) % 360) - 180;
    const ry = 60 + ((i * 37 + tornado.tempo * 9) % (CHAO - 50));
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx - 4, ry + 14);
    ctx.stroke();
  }
}

function desenharTornado() {
  desenharNuvem();

  const passos = 40;
  const esq = [];
  const dir = [];
  for (let i = 0; i <= passos; i++) {
    const t = i / passos;
    const y = TOPO_FUNIL + t * (BASE_FUNIL - TOPO_FUNIL);
    const c = centroFunil(t);
    const w = larguraFunil(t);
    esq.push([c - w, y]);
    dir.push([c + w, y]);
  }

  // contorno do cone
  ctx.save();
  ctx.beginPath();
  esq.forEach(function (p, i) { if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); });
  for (let i = passos; i >= 0; i--) ctx.lineTo(dir[i][0], dir[i][1]);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, TOPO_FUNIL, 0, BASE_FUNIL);
  grad.addColorStop(0, "rgb(55, 62, 72)");
  grad.addColorStop(0.6, "rgb(95, 104, 114)");
  grad.addColorStop(1, "rgb(130, 120, 105)");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.clip();

  // faixas girando, dão a sensação de rotação
  for (let k = 0; k < 16; k++) {
    const t = (k + (tornado.tempo * 0.06) % 1) / 16;
    const y = TOPO_FUNIL + t * (BASE_FUNIL - TOPO_FUNIL);
    const w = larguraFunil(t);
    const c = centroFunil(t);
    ctx.strokeStyle = "rgba(200, 210, 220, " + (0.1 + 0.18 * Math.pow(Math.sin(k * 1.7 + tornado.tempo / 8), 2)) + ")";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(c, y, w, 4 + w * 0.08, 0, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
  }
  // sombra nas laterais, para dar volume
  const lado = ctx.createLinearGradient(tornado.x - raioDoTornado(), 0, tornado.x + raioDoTornado(), 0);
  lado.addColorStop(0, "rgba(10, 14, 20, 0.45)");
  lado.addColorStop(0.5, "rgba(10, 14, 20, 0)");
  lado.addColorStop(1, "rgba(10, 14, 20, 0.45)");
  ctx.fillStyle = lado;
  ctx.fillRect(0, TOPO_FUNIL, LARGURA, BASE_FUNIL - TOPO_FUNIL);
  ctx.restore();

  // nuvem de poeira e entulho na base
  const bx = centroFunil(1);
  for (let i = 0; i < 9; i++) {
    const a = tornado.tempo / 10 + i * 0.7;
    const r = 16 + nivelSim * 6 + (i % 3) * 8;
    ctx.fillStyle = "rgb(" + (120 + (i % 3) * 8) + ", " + (100 + (i % 3) * 8) + ", 75)";
    ctx.beginPath();
    ctx.ellipse(bx + Math.cos(a) * r * 1.3, BASE_FUNIL - 6 + Math.sin(a) * 5 - (i % 3) * 5,
      r, r * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function desenharSim() {
  ctx.clearRect(0, 0, LARGURA, ALTURA);
  ctx.fillStyle = "#a9b8c7";
  ctx.fillRect(0, 0, LARGURA, ALTURA);
  ctx.fillStyle = "#6b8e4e";
  ctx.fillRect(0, CHAO - 10, LARGURA, ALTURA - CHAO + 10);

  desenharTornado();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // em telas estreitas o canvas é reduzido pelo CSS; aumentamos os objetos para continuarem legíveis
  const escala = Math.min(1.8, Math.max(1, 700 / (canvas.clientWidth || LARGURA)));
  objetos
    .slice()
    .sort(function (a, b) { return a.base - b.base; })
    .forEach(function (o) {
      const x = o.x + (o.tremor ? (Math.random() - 0.5) * o.tremor * 2 : 0);
      ctx.globalAlpha = 1;
      // sombra no chão, para o objeto parecer sólido
      if (o.estado === "chao") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.beginPath();
        ctx.ellipse(x, o.y + 1, o.tam * escala * 0.45, o.tam * escala * 0.12, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // emoji colorido usa o alfa do fillStyle: sem isso herdaria a transparência da sombra
      ctx.fillStyle = "#000";
      const tam = o.tam * escala;
      ctx.font = tam + "px serif";
      ctx.save();
      ctx.translate(x, o.y - tam / 2);
      ctx.rotate(o.giro);
      ctx.fillText(o.emoji, 0, 0);
      ctx.restore();
    });
}

let loopRodando = false;
function loopSim() {
  if (!animando || pausado) { loopRodando = false; return; }
  loopRodando = true;
  atualizarSim();
  desenharSim();
  requestAnimationFrame(loopSim);
}

function selecionarCategoria(i) {
  const cat = categorias[i];
  nivelSim = i;
  listaEl.querySelectorAll(".card").forEach(function (c, k) { c.classList.toggle("ativo", k === i); });
  const levanta = coisas.filter(function (c) { return c.nivel <= i; })
    .map(function (c) { return c.emoji; });
  detalheEl.style.borderLeftColor = cat.cor;
  detalheEl.innerHTML =
    "<h3>" + cat.nome + " – Dano " + cat.dano + "</h3>" +
    "<p>💨 <strong>Vento:</strong> " + cat.vento + "</p>" +
    "<p>🏚️ <strong>O que acontece:</strong> " + cat.efeito + "</p>" +
    "<p>🌪️ <strong>Puxa do chão:</strong> " + levanta.join(" ") + "</p>";
  canvas.setAttribute("aria-label", "Simulação de um tornado " + cat.nome +
    " puxando do chão: " + levanta.length + " tipos de objetos");
  criarObjetos();
  if (!animando || pausado) desenharSim();
}

function atualizarBotaoPausa() {
  simPausaEl.textContent = pausado ? "▶ Continuar" : "⏸ Pausar";
}

simPausaEl.addEventListener("click", function () {
  pausado = !pausado;
  atualizarBotaoPausa();
  if (!pausado && animando && !loopRodando) loopSim();
});

criarObjetos();
atualizarBotaoPausa();
selecionarCategoria(0);

// Só anima enquanto o simulador aparece na tela
new IntersectionObserver(function (entradas) {
  animando = entradas[0].isIntersecting;
  if (animando && !pausado && !loopRodando) loopSim();
}).observe(canvas);

// Mostra a linha do tempo
const tempoEl = document.getElementById("linha-do-tempo");

historia.forEach(function (ev) {
  const div = document.createElement("div");
  div.className = "evento";
  div.innerHTML =
    '<div class="ano">' + ev.ano + "</div>" +
    "<strong>" + ev.nome + "</strong>" +
    "<p>" + ev.texto + "</p>";
  tempoEl.appendChild(div);
});

// Mostra os alertas da Defesa Civil
// Triângulo de alerta em SVG (amarelo com borda escura, laranja com degradê, vermelho liso)
function trianguloAlerta(tipo) {
  const t = {
    amarelo: { fill: "#ffee00", borda: "#333333", larg: 9, marca: "#333333" },
    laranja: { fill: "url(#grad-alerta-laranja)", borda: "#f08a1c", larg: 8, marca: "#5a2a0a" },
    vermelho: { fill: "#ff0000", borda: "#ff0000", larg: 10, marca: "#ffffff" }
  }[tipo];
  return '<svg viewBox="0 0 100 90" width="52" height="47" aria-hidden="true">' +
    (tipo === "laranja"
      ? '<defs><linearGradient id="grad-alerta-laranja" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#ff9a2e"/><stop offset="1" stop-color="#e8590c"/></linearGradient></defs>'
      : "") +
    '<polygon points="50,14 88,78 12,78" fill="' + t.fill + '" stroke="' + t.borda + '" stroke-width="' + t.larg + '" stroke-linejoin="round"/>' +
    '<rect x="45.5" y="37" width="9" height="22" rx="4.5" fill="' + t.marca + '"/>' +
    '<circle cx="50" cy="67" r="4.8" fill="' + t.marca + '"/></svg>';
}

function criarAlerta(a, comGrau) {
  const div = document.createElement("article");
  div.className = "alerta";
  div.style.borderLeftColor = a.cor;
  div.innerHTML =
    '<div class="alerta-topo">' +
    (a.triangulo
      ? '<span class="alerta-selo triangulo">' + trianguloAlerta(a.triangulo) + "</span>"
      : '<span class="alerta-selo" aria-hidden="true" style="background:' + a.cor + ";color:" + a.texto + '">' + a.simbolo + "</span>") +
    "<div><h4>" + a.nome + (comGrau ? " · " + a.grau : "") + "</h4>" +
    '<span class="alerta-risco">Risco: <strong>' + a.risco + "</strong></span></div></div>" +
    (a.fenomeno ? "<p><strong>Referência:</strong> " + a.fenomeno + "</p>" : "") +
    "<p><strong>O que significa:</strong> " + a.significa + "</p>" +
    "<p><strong>O que fazer:</strong> " + a.fazer + "</p>";
  return div;
}
alertasCores.forEach(function (a) { document.getElementById("alertas-cores").appendChild(criarAlerta(a, true)); });
alertasCelular.forEach(function (a) { document.getElementById("alertas-celular").appendChild(criarAlerta(a, false)); });

// Mostra os tornados mais fortes de cada região
const regioesEl = document.getElementById("regioes-lista");

regioes.forEach(function (r) {
  const div = document.createElement("article");
  div.className = "regiao";
  div.innerHTML =
    '<span class="regiao-nome"><span aria-hidden="true">' + r.emoji + "</span> " + r.regiao + "</span>" +
    "<h3>" + r.nome + "</h3>" +
    '<p class="regiao-meta"><strong>' + r.nivel + "</strong> · " + r.data + "</p>" +
    "<p>" + r.texto + "</p>";
  regioesEl.appendChild(div);
});

// ---------- Galeria de fotos ----------
// Coloque as imagens na pasta "imagens" e escreva o nome do arquivo aqui.
// "tipos" define em quais filtros da galeria a foto aparece.
const fotos = [
  { arquivo: "hero/tornado-campo.jpg", tipos: [], legenda: "Tornado em campo aberto" },
  { arquivo: "hero/tornado-formacao.webp", tipos: ["formacao"], legenda: "Como um tornado se forma" },
  { arquivo: "hero/supercelula.webp", tipos: ["formacao"], legenda: "Estrutura de uma nuvem supercélula" },
  { arquivo: "galeria/tornado-landspout-lamar-co.webp", tipos: ["landspout"], legenda: "Landspout (tornado sem supercélula) — Lamar, Colorado, EUA, 2023", credito: "Stefan Klein, CC BY-SA 4.0" },
  { arquivo: "galeria/tornado-ef0-alasca.webp", tipos: ["fracos"], legenda: "Tornado EF0 — Rusty Point, Alasca, EUA, 2024", credito: "NWS Anchorage, domínio público" },
  { arquivo: "galeria/tornado-ef4-solomon-ks.webp", tipos: ["fortes"], legenda: "Tornado EF4 — Solomon, Kansas, EUA, 2016", credito: "Ks0stm, CC BY 4.0" },
  { arquivo: "galeria/tornado-ef2-estufa-dodge-city.webp", tipos: ["fracos"], legenda: "Tornado em forma de “cano de fogão” — Dodge City, Kansas, EUA", credito: "Lane Pearman, CC BY 2.0" },
  { arquivo: "galeria/tornado-f5-elie-manitoba.webp", tipos: ["fortes"], legenda: "Tornado F5 de Elie — Manitoba, Canadá, 2007", credito: "Justin Hobson. Original upload, CC BY 2.5" },
  { arquivo: "galeria/tornado-contraluz-noaa.webp", tipos: [], legenda: "Funil e tornado em contraluz — acervo NOAA", credito: "Acervo oficial (NOAA/NWS), domínio público" },
  { arquivo: "galeria/tornado-alfalfa-noaa.webp", tipos: [], legenda: "Tornado de Alfalfa, Oklahoma — acervo NOAA", credito: "Acervo oficial (NOAA/NWS), domínio público" },
  { arquivo: "galeria/tornado-f3-cheyenne-1977.webp", tipos: ["fortes"], legenda: "Tornado F3 — Cheyenne, Wyoming, EUA, 1977", credito: "Unknown authorUnknown author, domínio público" },
  { arquivo: "galeria/tornado-f5-moore-1999.webp", tipos: ["fortes"], legenda: "Tornado F5 — Moore, Oklahoma, EUA, 1999", credito: "Mike Eilts, National Severe St, domínio público" },
  { arquivo: "galeria/tornado-doran-2010.webp", tipos: [], legenda: "Tornado de Doran, Minnesota, EUA, 2010", credito: "Steve Lyons, domínio público" },
  { arquivo: "galeria/tornado-f5-wichita-1964.webp", tipos: ["fortes"], legenda: "Tornado F5 — Condado de Wichita, Texas, EUA, 1964", credito: "Unknown authorUnknown author, domínio público" },
  { arquivo: "galeria/tornado-f4-warner-robins-1953.webp", tipos: ["fortes"], legenda: "Tornado F4 — Warner Robins, Geórgia, EUA, 1953", credito: "Ernest Bostelmann, domínio público" },
  { arquivo: "galeria/tornado-ef5-enderlin-2025.webp", tipos: ["fortes"], legenda: "Tornado EF5 — Enderlin, Dakota do Norte, EUA, 2025", credito: "Celton Henderson, CC BY-SA 4.0" },
  { arquivo: "galeria/tornado-ef5-moore-2013.webp", tipos: ["fortes"], legenda: "Tornado EF5 — Moore, Oklahoma, EUA, 2013", credito: "Ks0stm, CC BY-SA 3.0" },
  { arquivo: "galeria/tornado-ef3-martinsburg-2023.webp", tipos: ["fortes"], legenda: "Tornado EF3 — Martinsburg, Iowa, EUA, 2023", credito: "Omaha Tornado Chaser, domínio público" },
  { arquivo: "galeria/tornado-brasil-taquarituba-2013.webp", tipos: ["brasil"], legenda: "Tornado em Taquarituba, São Paulo, Brasil, 2013", credito: "Jose Reynaldo da Fonseca, CC BY-SA 3.0" },
  { arquivo: "galeria/tornado-f3-goderich-2011.webp", tipos: ["fortes"], legenda: "Tornado F3 — Goderich, Ontário, Canadá, 2011", credito: "PhotoJunkie!, CC BY 2.0" },
  { arquivo: "galeria/tornado-barrie.webp", tipos: [], legenda: "Tornado em Barrie, Ontário, Canadá", credito: "Duckdave, CC BY-SA 4.0" },
  { arquivo: "galeria/tornado-tromba-dagua-dupla.webp", tipos: ["landspout"], legenda: "Tromba-d'água dupla", credito: "GollyGforce - Living My Worst Nightmare, CC BY 2.0" },
  { arquivo: "galeria/tornado-nuvem-funil-noaa.webp", tipos: ["formacao"], legenda: "Nuvem-funil descendo em direção ao solo — acervo NOAA", credito: "Acervo oficial (NOAA/NWS), domínio público" },
  { arquivo: "galeria/tornado-nuvem-funil-vortex.webp", tipos: ["formacao"], legenda: "Nuvem-funil — projeto VORTEX, 1994", credito: "Unknown VORTEX project member., domínio público" },
  { arquivo: "galeria/tornado-vortex2-2009.webp", tipos: [], legenda: "Tornado — projeto VORTEX2, 2009", credito: "John Oakland, CIMSS / VORTEX II, domínio público" },
  { arquivo: "galeria/tornado-nuvem-parede-noaa.webp", tipos: ["formacao"], legenda: "Nuvem-parede em rotação — NOAA, 1976", credito: "OAR/ERL/National Severe Storms Laborator, domínio público" },
  { arquivo: "galeria/tornado-dano-f4-pirai.webp", tipos: ["danos", "brasil"], legenda: "Árvores destruídas por tornado F4 — Piraí do Sul, Brasil", credito: "Ado LM, CC BY-SA 4.0" },
  { arquivo: "galeria/tornado-dano-ef5-arvore.webp", tipos: ["danos"], legenda: "Árvore sem casca após tornado EF5 — El Reno, EUA", credito: "Runningonbrains, CC BY-SA 3.0" },
  { arquivo: "galeria/tornado-dano-rio-bonito.webp", tipos: ["danos", "brasil"], legenda: "Vegetação destruída por tornado — Rio Bonito do Iguaçu, Brasil", credito: "Roberto Dziura, CC0" }
];

// A galeria (carrossel, filtros e visualizador) é montada em galeria.js

// ---------- Quiz ----------
const perguntas = [
  { texto: "Como se chama a escala que mede a força dos tornados?",
    opcoes: ["Escala Richter", "Escala Fujita", "Escala Celsius"], certa: 1 },
  { texto: "Qual é a categoria mais forte?",
    opcoes: ["EF0", "EF3", "EF5"], certa: 2 },
  { texto: "De onde nasce um tornado?",
    opcoes: ["De uma nuvem de tempestade", "Do fundo do mar", "De um vulcão"], certa: 0 },
  { texto: "Qual país tem mais tornados no mundo?",
    opcoes: ["Egito", "Estados Unidos", "Japão"], certa: 1 },
  { texto: "Como se chama um tornado que passa sobre a água?",
    opcoes: ["Tromba-d'água", "Maremoto", "Furacão"], certa: 0 },
  { texto: "Em que cidade de Santa Catarina um tornado causou estragos em 2015?",
    opcoes: ["Joinville", "Xanxerê", "Blumenau"], certa: 1 }
];

const quizEl = document.getElementById("quiz-caixa");
let atual = 0;
let pontos = 0;

function mostrarPergunta() {
  if (atual >= perguntas.length) {
    quizEl.innerHTML =
      "<h3>Fim! Você acertou " + pontos + " de " + perguntas.length + " 🎉</h3>" +
      '<button class="proxima" id="de-novo">Jogar de novo</button>';
    document.getElementById("de-novo").onclick = function () {
      atual = 0;
      pontos = 0;
      mostrarPergunta();
    };
    return;
  }

  const p = perguntas[atual];
  quizEl.innerHTML = "<p><strong>Pergunta " + (atual + 1) + " de " +
    perguntas.length + ":</strong> " + p.texto + "</p>";

  const botoes = [];
  p.opcoes.forEach(function (texto, i) {
    const b = document.createElement("button");
    b.className = "opcao";
    b.textContent = texto;
    b.onclick = function () {
      botoes.forEach(function (x) { x.disabled = true; });
      botoes[p.certa].classList.add("certa");
      if (i === p.certa) {
        pontos++;
      } else {
        b.classList.add("errada");
      }
      const prox = document.createElement("button");
      prox.className = "proxima";
      prox.textContent = "Próxima ➡️";
      prox.onclick = function () { atual++; mostrarPergunta(); };
      quizEl.appendChild(prox);
      prox.focus();
    };
    botoes.push(b);
    quizEl.appendChild(b);
  });
}

mostrarPergunta();

// ---------- Menu no celular ----------
const menuBotao = document.getElementById("menu-botao");
const menuLinks = document.getElementById("menu-links");

menuBotao.addEventListener("click", function () {
  const aberto = menuLinks.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", aberto);
});
menuLinks.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    menuLinks.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
  }
});
