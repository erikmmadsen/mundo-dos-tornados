# appTornado

Site estático em português (pt-BR), "Mundo dos Tornados": explica como os tornados se formam, a escala Fujita Melhorada (EF0 a EF5), tornados históricos, galeria, quiz e curiosidades. Projeto de estudo, sem build nem dependências: abrir `index.html` no navegador. Online (GitHub Pages): https://erikmmadsen.github.io/mundo-dos-tornados/ . Repositório: https://github.com/erikmmadsen/mundo-dos-tornados .

## Estrutura

- `index.html`: página única, com as seções agrupadas em 5 conjuntos temáticos (`.tema`): Entenda (o-que-e, ar-quente-frio, supercelula), Classificação (categorias, simulador), História (historia, regioes), Prevenção (radar, alertas) e Explore (galeria, quiz, curiosidades). O menu lista os 5 temas.
- `style.css`: estilos.
- `script.js`: dados (categorias, tornados históricos, regiões, alertas, fotos, perguntas), simulador e a renderização das seções.
- `galeria.js`: seção `#galeria`, carrossel (scroll-snap) com filtros por tipo (campo `tipos` de cada foto em `script.js`), miniaturas, barra de progresso e visualizador em `<dialog>` com setas, teclado e swipe.
- `radar.js`: seção `#radar`, previsão real de 3 dias (chuva, vento, CAPE) via Open-Meteo, cobrindo toda a área visível do mapa, que fica travado na cidade pesquisada (um pedido por busca), e desenhada sobre mapa Leaflet (CDN cdnjs, tiles Esri Light Gray, sem chave; CARTO e OSM não servem: pedem chave/referer). Precisa de internet.
- `imagens/`: `supercelula.webp`, `tornado-campo.jpg`, `tornado-formacao.webp` e `galeria/` (26 fotos reais de tornados em WebP, máx. 1600 px, ~3,5 MB; autores e licenças em `imagens/CREDITOS.md`).
- `README.md`, `.gitignore` e `.github/` (modelos de issue e de pull request).

## Convenções

- Código e textos em português; JavaScript simples (sem frameworks).
- Git: nunca commitar direto na `main`. Cada alteração vai em uma branch nova, criada a partir da `main`, com o nome `feat/erikmm_<descricao>_<yyyyMMdd>` (descrição curta, minúsculas, com hífens; data do dia). Commitar na branch a cada passo. Não fazer merge na `main` sem o usuário pedir.
- GitHub: cada branch tem uma **issue** (modelos em `.github/ISSUE_TEMPLATE/`) e um **pull request** que a fecha com `Closes #N`, aberto pela skill `personal-github-pr` (descrição em `pr-<nome>.md`, ignorado pelo git). Issues e PRs entram no projeto "Mundo dos Tornados" (https://github.com/users/erikmmadsen/projects/1).
- PR com base na `main`. Se a branch depende de outra ainda não mesclada, o PR fica empilhado; depois de mesclar a de baixo, **trocar a base do próximo para `main`** (um PR mesclado em outra branch não chega à `main`). Mesclar com merge commit e apagar a branch depois.
- Remoto: `origin` usa o apelido SSH `github-erik` (`git@github-erik:erikmmadsen/mundo-dos-tornados.git`, chave `~/.ssh/id_ed25519_erikmmadsen`). O `gh` precisa estar com a conta `erikmmadsen` ativa (`gh auth switch --user erikmmadsen`); o caminho é `C:\Program Files\GitHub CLI\gh.exe`.
- Ao resolver conflito no `CLAUDE.md` (várias branches acrescentam linhas no mesmo ponto), manter as duas versões das linhas.

## Histórico do projeto

### 2026-10-03

- `e603bd4`: **Versão inicial do appTornado.** Site com menu, hero, seção "O que é um tornado?", categorias EF0 a EF5 clicáveis, linha do tempo de tornados históricos (1925 a 2015), galeria com ampliação, quiz e curiosidades. Está na `main`, marcada com a tag `v0-snapshot-20261003` (também na branch `feat/erikmm_snapshot-versao-atual_20261003`).
- `ccaa7a9`: **Simulador de destruição por categoria (EF0 a EF5).** Nova seção `#simulador` com `<canvas>`: o usuário escolhe a categoria e vê o tornado puxando do chão os objetos que ele consegue levar (o EF0 só leva coisas leves). Inclui link no menu e estilos `.sim-canvas`. Está na branch `feat/erikmm_simulador-destruicao_20261003`, **incorporada à `main`**.
- Branch `feat/erikmm_claude-md-historico_20261003`: criação deste `CLAUDE.md`.
- Branch `feat/erikmm_tornado-cone-radar_20261003` (criada a partir da branch do simulador, que ela depende): **tornado realista e radar meteorológico.** O funil agora é um cone invertido com curvatura, faixas girando, nuvem-parede, chuva e poeira na base. Ao lado do simulador há um radar (`#radar-canvas`) com varredura, anéis de distância, chuva fraca, núcleo da tempestade, eco em gancho e marcador de tornado que acompanha o tornado da cena; a intensidade muda com a categoria. Inclui a cópia do `CLAUDE.md`. **Incorporada à `main`.**
- Branch `feat/erikmm_radar-previsao-3dias_20261003` (a partir da branch do cone): **radar meteorológico real.** Substitui o radar de mentira do simulador (removido) por uma seção `#radar` com previsão real de 3 dias do Open-Meteo: busca de cidade ou localização, mapa, camadas de chuva, vento (rajadas e setas) e energia de tempestade (CAPE), controle de hora com play e resumo por dia com nível de risco. Também deixa os objetos do simulador (casas etc.) sólidos, com sombra no chão. Começa em Xanxerê (SC). Funil, nuvem e poeira do simulador são opacos (sem rgba). Atenção: emoji no canvas herda o alfa do `fillStyle`; por isso o `fillStyle` é resetado para `#000` antes do `fillText` (senão as casas ficam transparentes). **Incorporada à `main`.**
- Branch `feat/erikmm_correcoes-ui_20261003` (a partir da branch do radar): **correções de UI da revisão de design.** Texto escuro nos botões EF0–EF3 (contraste) e sem opacidade; menu hambúrguer no celular; Curiosidades sem o bug de flex (texto em `<p>`) e sem emoji de bandeira (não renderiza no Windows); legenda do radar com mín/máx nas pontas da barra. **Incorporada à `main`.**
- Branch `feat/erikmm_radar-simulador-melhorias_20261003`: **melhorias do radar e do simulador.** O simulador agora fica dentro da seção Categorias: um único seletor EF0–EF5 controla detalhes e simulação (o link do menu "Simulador" aponta para `#simulador`, um `<h3>`). Botão Pausar e respeito a `prefers-reduced-motion`; emojis escalam em telas estreitas. Radar: interpolação suave, bordas esmaecidas, grade de ~110 km, risco em 4 níveis (Baixo/Atenção/Moderado/Alto, por CAPE e rajada) e horário do pico de chuva e vento por dia. **Incorporada à `main`.**
- Branch `feat/erikmm_acessibilidade-acabamento_20261003`: **acessibilidade e acabamento.** Foco visível (`:focus-visible`), `aria-live` no quiz e no status do radar, rótulos nos campos do radar, `prefers-reduced-motion` no CSS, favicon (SVG inline), ícone do menu maior, números do hero em grade, aviso quando o Leaflet/CDN não carrega e remoção do arquivo vazio `teste`. **Incorporada à `main`.**
- Branch `feat/erikmm_galeria-30-fotos-reais_20261003` (a partir da branch do radar): **galeria com 26 fotos reais** do Wikimedia Commons (tornados em voo, F/EF, trombas-d'água, nuvem-parede, casos do Brasil e danos), 1600 px WebP, com crédito na legenda e em `imagens/CREDITOS.md`. **Incorporada à `main`.**
- Branch `feat/erikmm_galeria-30-fotos-reais_20261003`: **galeria com 26 fotos reais** (Wikimedia Commons) e créditos em `imagens/CREDITOS.md`; corrigida uma quebra de linha em string que derrubava o `script.js`. **Incorporada à `main`.**
- Branch `feat/erikmm_atualiza-historico_20261003`: este histórico atualizado após o merge. **Incorporada à `main`.**


### 2026-10-04

Tudo abaixo entrou na `main` por pull request (merge commit). As branches foram apagadas depois do merge.

| Issue | PR | Conteúdo |
|---|---|---|
| #1 | #2 | `README.md`, `.gitignore` e modelos de issue e de PR em `.github/`. |
| #3 | #4 | Seções `#supercelula` (mesociclone, 4 passos, eco em gancho) e `#ar-quente-frio` (ar quente/úmido x frio/seco, instabilidade, gatilho, cisalhamento). |
| #5 | #6 | Radar: grade 9x9 com passo de 1,5° (antes 7x7 com 1°, que aparecia como um quadrado pequeno no mapa) e mapa enquadrado com `fitBounds`. |
| #7 | #8 | Radar: a grade 10x7 cobre toda a área visível do mapa. Linhas espaçadas na projeção Mercator, como o Leaflet estica a imagem. A cidade pesquisada vai como ponto extra na mesma chamada e alimenta o resumo por dia. |
| #9 | #10 | Radar: mapa travado na cidade pesquisada (sem arrastar, zoom nem botões de zoom) para gastar menos dados: **um pedido por busca**. |
| #11 | #12 | Galeria em carrossel (`galeria.js`): scroll-snap, arrastar com mouse, setas e teclado, chips de filtro por tipo, miniaturas, barra de progresso e popup (`<dialog>`) com anterior/próxima, contador, ESC, clique no fundo, swipe e pré-carga da vizinha. Respeita `prefers-reduced-motion` (usa `behavior: "instant"`, pois `"auto"` herdaria o `scroll-behavior: smooth` do CSS). |
| #13 | #14 | Seção `#regioes`: o tornado mais forte (ou mais devastador) de cada região (dados em `regioes` no `script.js`). As classificações antigas são estimativas e variam por fonte. Também reuniu o radar, a galeria e a supercélula. |
| #15 | #16 | Seção `#alertas`: alertas amarelo, laranja e vermelho (risco, referência de vento e chuva, o que significa e o que fazer, com triângulos SVG feitos em `trianguloAlerta`) e alertas de celular (severo e extremo, SMS 40199, telefone 199). Tornado não tem cor própria: entra nos alertas de tempestade. Não é o logotipo oficial. |
| #17 | #18 | Seções e menu em ordem lógica. |
| #19 | #21 | Seções agrupadas em 5 conjuntos temáticos, com cabeçalho, atalhos e menu por tema. (O #20 foi mesclado por engano na branch `ordem-secoes`, sem base `main`; o #21 levou a mesma mudança para a `main`.) |

O site está publicado no GitHub Pages, a partir da `main`. Repositório com descrição, link do site e topics no "About".

Atualizar esta seção a cada nova alteração.

Lição: uma quebra de linha literal dentro de uma string JS (`"..."`) derruba o `script.js` inteiro. Ao colar créditos/legendas vindos de fontes externas (ex.: Wikimedia), tirar quebras de linha.
