// ---------- Galeria: carrossel com filtros e visualizador ----------
// Usa o array "fotos" (com "tipos") definido em script.js.

const tiposGaleria = [
  { id: "todos", nome: "Todas" },
  { id: "fracos", nome: "Fracos (EF0–EF2)" },
  { id: "fortes", nome: "Fortes (EF3–EF5)" },
  { id: "landspout", nome: "Landspout e tromba-d'água" },
  { id: "formacao", nome: "Formação" },
  { id: "danos", nome: "Danos" },
  { id: "brasil", nome: "Brasil" }
];

const filtrosEl = document.getElementById("galeria-filtros");
const carrosselEl = document.getElementById("carrossel");
const miniaturasEl = document.getElementById("miniaturas");
const barraEl = document.getElementById("car-barra");
const contadorEl = document.getElementById("car-contador");
const setaAntEl = document.getElementById("car-ant");
const setaProxEl = document.getElementById("car-prox");

const visEl = document.getElementById("visualizador");
const visImgEl = document.getElementById("vis-img");
const visLegendaEl = document.getElementById("vis-legenda");
const visCreditoEl = document.getElementById("vis-credito");
const visContadorEl = document.getElementById("vis-contador");

const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
let filtroAtual = "todos";
let lista = fotos;          // fotos do filtro atual
let ativo = 0;              // slide em destaque no carrossel
let slides = [];
let miniaturas = [];

// "instant" ignora o scroll-behavior: smooth do CSS (usado quando o usuário prefere menos movimento)
function comportamento() { return reduzirMovimento.matches ? "instant" : "smooth"; }

function legendaCompleta(f) {
  return f.credito ? f.legenda + " (Foto: " + f.credito + ")" : f.legenda;
}

// ---- filtros ----
tiposGaleria.forEach(function (t) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chip";
  b.dataset.id = t.id;
  const qtd = t.id === "todos" ? fotos.length :
    fotos.filter(function (f) { return f.tipos && f.tipos.indexOf(t.id) >= 0; }).length;
  b.innerHTML = t.nome + " <span>" + qtd + "</span>";
  b.addEventListener("click", function () { aplicarFiltro(t.id); });
  filtrosEl.appendChild(b);
});

function aplicarFiltro(id) {
  filtroAtual = id;
  lista = id === "todos" ? fotos : fotos.filter(function (f) { return f.tipos && f.tipos.indexOf(id) >= 0; });
  filtrosEl.querySelectorAll(".chip").forEach(function (c) {
    const on = c.dataset.id === id;
    c.classList.toggle("ativo", on);
    c.setAttribute("aria-pressed", on);
  });
  montarCarrossel();
}

// ---- carrossel ----
function montarCarrossel() {
  carrosselEl.innerHTML = "";
  miniaturasEl.innerHTML = "";
  carrosselEl.scrollTo({ left: 0, behavior: "instant" });

  lista.forEach(function (f, i) {
    const fig = document.createElement("figure");
    fig.className = "slide entrando";
    fig.style.animationDelay = Math.min(i, 6) * 60 + "ms";
    const img = document.createElement("img");
    img.src = "imagens/" + f.arquivo;
    img.alt = f.legenda;
    img.loading = i < 3 ? "eager" : "lazy";
    img.decoding = "async";
    img.draggable = false;
    const leg = document.createElement("figcaption");
    leg.textContent = f.legenda;
    if (f.credito) {
      const c = document.createElement("small");
      c.textContent = "Foto: " + f.credito;
      leg.appendChild(c);
    }
    fig.appendChild(img);
    fig.appendChild(leg);
    fig.addEventListener("click", function () {
      if (arrastou) return;
      if (i === ativo) abrirVisualizador(i); else irPara(i);
    });
    carrosselEl.appendChild(fig);

    const mini = document.createElement("button");
    mini.type = "button";
    mini.className = "miniatura";
    mini.setAttribute("aria-label", "Ir para: " + f.legenda);
    const mimg = document.createElement("img");
    mimg.src = "imagens/" + f.arquivo;
    mimg.alt = "";
    mimg.loading = "lazy";
    mimg.decoding = "async";
    mini.appendChild(mimg);
    mini.addEventListener("click", function () { irPara(i); });
    miniaturasEl.appendChild(mini);
  });

  slides = Array.prototype.slice.call(carrosselEl.children);
  miniaturas = Array.prototype.slice.call(miniaturasEl.children);
  ativo = 0;
  atualizarAtivo();
}

function irPara(i, instantaneo) {
  i = Math.max(0, Math.min(lista.length - 1, i));
  const s = slides[i];
  carrosselEl.scrollTo({
    left: s.offsetLeft - (carrosselEl.clientWidth - s.clientWidth) / 2,
    behavior: instantaneo ? "instant" : comportamento()
  });
}

function slideMaisCentral() {
  const centro = carrosselEl.scrollLeft + carrosselEl.clientWidth / 2;
  let melhor = 0;
  let menor = Infinity;
  slides.forEach(function (s, i) {
    const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - centro);
    if (d < menor) { menor = d; melhor = i; }
  });
  return melhor;
}

function atualizarAtivo() {
  if (!slides.length) return;
  ativo = slideMaisCentral();
  slides.forEach(function (s, i) { s.classList.toggle("ativo", i === ativo); });
  miniaturas.forEach(function (m, i) {
    m.classList.toggle("ativo", i === ativo);
    if (i === ativo) m.setAttribute("aria-current", "true"); else m.removeAttribute("aria-current");
  });
  // centraliza a miniatura ativa dentro da faixa, sem rolar a página
  const m = miniaturas[ativo];
  miniaturasEl.scrollTo({
    left: m.offsetLeft - (miniaturasEl.clientWidth - m.clientWidth) / 2,
    behavior: comportamento()
  });
  barraEl.style.width = ((ativo + 1) / lista.length * 100) + "%";
  contadorEl.textContent = (ativo + 1) + " / " + lista.length;
  setaAntEl.disabled = ativo === 0;
  setaProxEl.disabled = ativo === lista.length - 1;
}

let esperandoQuadro = false;
carrosselEl.addEventListener("scroll", function () {
  if (esperandoQuadro) return;
  esperandoQuadro = true;
  requestAnimationFrame(function () { esperandoQuadro = false; atualizarAtivo(); });
}, { passive: true });

setaAntEl.addEventListener("click", function () { irPara(ativo - 1); });
setaProxEl.addEventListener("click", function () { irPara(ativo + 1); });

carrosselEl.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") { e.preventDefault(); irPara(ativo - 1); }
  else if (e.key === "ArrowRight") { e.preventDefault(); irPara(ativo + 1); }
  else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirVisualizador(ativo); }
});

// arrastar com o mouse (toque já funciona nativamente)
let arrastou = false;
let arrastando = false;
let inicioX = 0;
let inicioScroll = 0;

carrosselEl.addEventListener("pointerdown", function (e) {
  if (e.pointerType !== "mouse" || e.button !== 0) return;
  arrastando = true;
  arrastou = false;
  inicioX = e.clientX;
  inicioScroll = carrosselEl.scrollLeft;
  carrosselEl.classList.add("arrastando");
});
window.addEventListener("pointermove", function (e) {
  if (!arrastando) return;
  const dx = e.clientX - inicioX;
  if (Math.abs(dx) > 5) arrastou = true;
  carrosselEl.scrollLeft = inicioScroll - dx;
});
window.addEventListener("pointerup", function () {
  if (!arrastando) return;
  arrastando = false;
  carrosselEl.classList.remove("arrastando");
  if (arrastou) {
    irPara(slideMaisCentral());
    setTimeout(function () { arrastou = false; }, 0);   // evita abrir o visualizador ao soltar
  }
});

// ---- visualizador (popup) ----
let visIndice = 0;
let visOrigem = null;

function mostrarNoVisualizador(i, direcao) {
  const f = lista[i];
  visIndice = i;
  visImgEl.src = "imagens/" + f.arquivo;
  visImgEl.alt = f.legenda;
  visLegendaEl.textContent = f.legenda;
  visCreditoEl.textContent = f.credito ? "Foto: " + f.credito : "";
  visContadorEl.textContent = (i + 1) + " / " + lista.length;
  document.getElementById("vis-ant").disabled = i === 0;
  document.getElementById("vis-prox").disabled = i === lista.length - 1;
  // animação de troca (vem do lado para onde o usuário navegou)
  visImgEl.classList.remove("vem-direita", "vem-esquerda");
  void visImgEl.offsetWidth;
  if (direcao) visImgEl.classList.add(direcao > 0 ? "vem-direita" : "vem-esquerda");
  // pré-carrega as fotos vizinhas
  [i - 1, i + 1].forEach(function (k) {
    if (lista[k]) new Image().src = "imagens/" + lista[k].arquivo;
  });
}

function abrirVisualizador(i) {
  visOrigem = document.activeElement;
  mostrarNoVisualizador(i, 0);
  if (!visEl.open) visEl.showModal();
}

function navegarVisualizador(passo) {
  const novo = visIndice + passo;
  if (novo < 0 || novo >= lista.length) return;
  mostrarNoVisualizador(novo, passo);
}

visEl.addEventListener("close", function () {
  irPara(visIndice, true);                    // carrossel acompanha a última foto vista
  if (visOrigem && visOrigem.focus) visOrigem.focus({ preventScroll: true });
});

document.getElementById("vis-fechar").addEventListener("click", function () { visEl.close(); });
document.getElementById("vis-ant").addEventListener("click", function () { navegarVisualizador(-1); });
document.getElementById("vis-prox").addEventListener("click", function () { navegarVisualizador(1); });

visEl.addEventListener("click", function (e) {
  if (e.target === visEl) visEl.close();      // clique no fundo escuro
});
visEl.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") navegarVisualizador(-1);
  else if (e.key === "ArrowRight") navegarVisualizador(1);
});

// deslizar o dedo (ou o mouse) sobre a foto troca de imagem
let toqueX = null;
visEl.addEventListener("pointerdown", function (e) {
  if (e.target === visImgEl) toqueX = e.clientX;
});
visEl.addEventListener("pointerup", function (e) {
  if (toqueX === null) return;
  const dx = e.clientX - toqueX;
  toqueX = null;
  if (Math.abs(dx) > 50) navegarVisualizador(dx < 0 ? 1 : -1);
});

aplicarFiltro("todos");
