# appTornado

Site estático em português (pt-BR), "Mundo dos Tornados": explica como os tornados se formam, a escala Fujita Melhorada (EF0 a EF5), tornados históricos, galeria, quiz e curiosidades. Projeto de estudo, sem build nem dependências: abrir `index.html` no navegador.

## Estrutura

- `index.html`: página única com as seções (o-que-e, categorias, simulador, radar, historia, galeria, quiz, curiosidades).
- `style.css`: estilos.
- `script.js`: dados (categorias, tornados históricos, fotos, perguntas), simulador e a renderização das seções.
- `radar.js`: seção `#radar`, previsão real de 3 dias (chuva, vento, CAPE) via Open-Meteo, desenhada sobre mapa Leaflet (CDN cdnjs, tiles Esri Light Gray, sem chave; CARTO e OSM não servem: pedem chave/referer). Precisa de internet.
- `imagens/`: `supercelula.webp`, `tornado-campo.jpg`, `tornado-formacao.webp` e `galeria/` (26 fotos reais de tornados em WebP, máx. 1600 px, ~3,5 MB; autores e licenças em `imagens/CREDITOS.md`).

## Convenções

- Código e textos em português; JavaScript simples (sem frameworks).
- Git: nunca commitar direto na `main`. Cada alteração vai em uma branch nova, criada a partir da `main`, com o nome `feat/erikmm_<descricao>_<yyyyMMdd>` (descrição curta, minúsculas, com hífens; data do dia). Commitar na branch a cada passo. Não fazer merge na `main` sem o usuário pedir.

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

Tudo acima foi incorporado à `main` por fast-forward (sem repositório remoto; o "deploy" é local). A branch `claude-md-historico` ficou como cópia: o `CLAUDE.md` já entrou na `main` via o commit equivalente da cadeia.
- Branch `feat/erikmm_radar-area-maior_20261004` (a partir da `main`): **radar cobre área maior.** Grade 9x9 com passo de 1,5° (~1300 km, antes 7x7 com 1°, ~660 km, que aparecia como um quadrado pequeno no mapa) e o mapa agora enquadra a grade com `fitBounds`. **Ainda não incorporada à `main`.**

### Estado das branches

| Branch | Conteúdo | Na `main`? |
|---|---|---|
| `main` | versão inicial | sim |
| `feat/erikmm_snapshot-versao-atual_20261003` | snapshot da versão inicial (mesmo commit da `main`) | sim |
| `feat/erikmm_simulador-destruicao_20261003` | simulador de destruição | sim |
| `feat/erikmm_claude-md-historico_20261003` | `CLAUDE.md` | sim |
| `feat/erikmm_tornado-cone-radar_20261003` | simulador + `CLAUDE.md` + tornado em cone + radar de mentira | sim |
| `feat/erikmm_radar-previsao-3dias_20261003` | tudo acima, com o radar real de previsão no lugar do falso | sim |
| `feat/erikmm_correcoes-ui_20261003` | + correções de UI (contraste, menu mobile, curiosidades) | sim |
| `feat/erikmm_radar-simulador-melhorias_20261003` | + simulador unificado, pausa, radar suave, risco em 4 níveis | sim |
| `feat/erikmm_acessibilidade-acabamento_20261003` | + acessibilidade, favicon, hero, sem `teste` | sim |
| `feat/erikmm_galeria-30-fotos-reais_20261003` | tudo acima + galeria com 26 fotos reais | sim |
| `feat/erikmm_galeria-30-fotos-reais_20261003` | + galeria com fotos reais e correção do script | sim |
| `feat/erikmm_atualiza-historico_20261003` | histórico atualizado | sim |

Atualizar esta seção a cada nova alteração.

Lição: uma quebra de linha literal dentro de uma string JS (`"..."`) derruba o `script.js` inteiro. Ao colar créditos/legendas vindos de fontes externas (ex.: Wikimedia), tirar quebras de linha.
