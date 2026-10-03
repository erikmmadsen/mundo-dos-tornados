// Dados das categorias (Escala Fujita Melhorada)
const categorias = [
  { nome: "EF0", vento: "105 a 137 km/h", cor: "#27ae60", dano: "Fraco",
    efeito: "Quebra galhos de árvores e derruba placas." },
  { nome: "EF1", vento: "138 a 177 km/h", cor: "#2ecc71", dano: "Moderado",
    efeito: "Arranca telhas e pode virar carros pequenos." },
  { nome: "EF2", vento: "178 a 217 km/h", cor: "#f1c40f", dano: "Considerável",
    efeito: "Destrói telhados e derruba árvores grandes." },
  { nome: "EF3", vento: "218 a 266 km/h", cor: "#e67e22", dano: "Severo",
    efeito: "Derruba paredes de casas e vira trens." },
  { nome: "EF4", vento: "267 a 322 km/h", cor: "#e74c3c", dano: "Devastador",
    efeito: "Destrói casas bem construídas e joga carros longe." },
  { nome: "EF5", vento: "mais de 322 km/h", cor: "#8e44ad", dano: "Incrível",
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

// Mostra os botões das categorias
const listaEl = document.getElementById("lista-categorias");
const detalheEl = document.getElementById("detalhe-categoria");

categorias.forEach(function (cat) {
  const botao = document.createElement("button");
  botao.className = "card";
  botao.textContent = cat.nome;
  botao.style.background = cat.cor;
  botao.addEventListener("click", function () {
    listaEl.querySelectorAll(".card").forEach(function (c) { c.classList.remove("ativo"); });
    botao.classList.add("ativo");
    detalheEl.style.borderLeftColor = cat.cor;
    detalheEl.innerHTML =
      "<h3>" + cat.nome + " – Dano " + cat.dano + "</h3>" +
      "<p>💨 <strong>Vento:</strong> " + cat.vento + "</p>" +
      "<p>🏚️ <strong>O que acontece:</strong> " + cat.efeito + "</p>";
  });
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

const simBotoesEl = document.getElementById("sim-botoes");
const simInfoEl = document.getElementById("sim-info");
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
        ctx.ellipse(x, o.y + 1, o.tam * 0.45, o.tam * 0.12, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.font = o.tam + "px serif";
      ctx.save();
      ctx.translate(x, o.y - o.tam / 2);
      ctx.rotate(o.giro);
      ctx.fillText(o.emoji, 0, 0);
      ctx.restore();
    });

}

let loopRodando = false;
function loopSim() {
  if (!animando) { loopRodando = false; return; }
  loopRodando = true;
  atualizarSim();
  desenharSim();
  requestAnimationFrame(loopSim);
}

function mostrarInfoSim() {
  const cat = categorias[nivelSim];
  const levanta = coisas.filter(function (c) { return c.nivel <= nivelSim; })
    .map(function (c) { return c.emoji; });
  simInfoEl.style.borderLeftColor = cat.cor;
  simInfoEl.innerHTML =
    "<h3>" + cat.nome + " – Dano " + cat.dano + "</h3>" +
    "<p>💨 <strong>Vento:</strong> " + cat.vento + "</p>" +
    "<p>🌪️ <strong>Puxa do chão:</strong> " + levanta.join(" ") + "</p>" +
    "<p>🏚️ <strong>O que acontece:</strong> " + cat.efeito + "</p>";
}

categorias.forEach(function (cat, i) {
  const b = document.createElement("button");
  b.className = "card";
  b.textContent = cat.nome;
  b.style.background = cat.cor;
  b.addEventListener("click", function () {
    simBotoesEl.querySelectorAll(".card").forEach(function (c) { c.classList.remove("ativo"); });
    b.classList.add("ativo");
    nivelSim = i;
    criarObjetos();
    mostrarInfoSim();
    if (!animando) desenharSim();
  });
  simBotoesEl.appendChild(b);
});

criarObjetos();
simBotoesEl.firstChild.classList.add("ativo");
mostrarInfoSim();
desenharSim();

// Só anima enquanto o simulador aparece na tela
new IntersectionObserver(function (entradas) {
  animando = entradas[0].isIntersecting;
  if (animando && !loopRodando) loopSim();
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

// ---------- Galeria de fotos ----------
// Coloque as imagens na pasta "imagens" e escreva o nome do arquivo aqui.
const fotos = [
  { arquivo: "tornado-campo.jpg", legenda: "Tornado em campo aberto" },
  { arquivo: "tornado-formacao.webp", legenda: "Como um tornado se forma" },
  { arquivo: "supercelula.webp", legenda: "Estrutura de uma nuvem supercélula" }
];

const fotosEl = document.getElementById("fotos");
const ampliadaEl = document.getElementById("ampliada");
const ampliadaImg = document.getElementById("ampliada-img");
const ampliadaLegenda = document.getElementById("ampliada-legenda");

fotos.forEach(function (f) {
  const fig = document.createElement("figure");
  fig.className = "foto";
  const img = document.createElement("img");
  img.src = "imagens/" + f.arquivo;
  img.alt = f.legenda;
  img.loading = "lazy";
  const legenda = document.createElement("figcaption");
  legenda.textContent = f.legenda;
  fig.appendChild(img);
  fig.appendChild(legenda);
  // Clique abre a imagem em tela cheia
  fig.addEventListener("click", function () {
    ampliadaImg.src = img.src;
    ampliadaImg.alt = f.legenda;
    ampliadaLegenda.textContent = f.legenda;
    ampliadaEl.hidden = false;
  });
  fotosEl.appendChild(fig);
});

ampliadaEl.addEventListener("click", function () { ampliadaEl.hidden = true; });
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") ampliadaEl.hidden = true;
});

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
    };
    botoes.push(b);
    quizEl.appendChild(b);
  });
}

mostrarPergunta();
