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
    document.querySelectorAll(".card").forEach(function (c) { c.classList.remove("ativo"); });
    botao.classList.add("ativo");
    detalheEl.style.borderLeftColor = cat.cor;
    detalheEl.innerHTML =
      "<h3>" + cat.nome + " – Dano " + cat.dano + "</h3>" +
      "<p>💨 <strong>Vento:</strong> " + cat.vento + "</p>" +
      "<p>🏚️ <strong>O que acontece:</strong> " + cat.efeito + "</p>";
  });
  listaEl.appendChild(botao);
});

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
