# appTornado

Site estático em português (pt-BR), "Mundo dos Tornados": explica como os tornados se formam, a escala Fujita Melhorada (EF0 a EF5), tornados históricos, galeria, quiz e curiosidades. Projeto de estudo, sem build nem dependências: abrir `index.html` no navegador.

## Estrutura

- `index.html`: página única com as seções (o-que-e, supercelula, ar-quente-frio, categorias, simulador, radar, historia, galeria, quiz, curiosidades).
- `style.css`: estilos.
- `script.js`: dados (categorias, tornados históricos, fotos, perguntas), simulador e a renderização das seções.
- `galeria.js`: seção `#galeria`, carrossel (scroll-snap) com filtros por tipo (campo `tipos` de cada foto em `script.js`), miniaturas, barra de progresso e visualizador em `<dialog>` com setas, teclado e swipe.
- `radar.js`: seção `#radar`, previsão real de 3 dias (chuva, vento, CAPE) via Open-Meteo, cobrindo toda a área visível do mapa, que fica travado na cidade pesquisada (um pedido por busca), e desenhada sobre mapa Leaflet (CDN cdnjs, tiles Esri Light Gray, sem chave; CARTO e OSM não servem: pedem chave/referer). Precisa de internet.
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
- Branch `feat/erikmm_supercelula-ar-quente-frio_20261004` (a partir da `main`): **novas seções explicativas.** `#supercelula` (mesociclone, 4 passos, eco em gancho) e `#ar-quente-frio` (ar quente/úmido x ar frio/seco, instabilidade, gatilho, cisalhamento), ambas logo após "O que é um tornado?", com links no menu ("Supercélula" e "Ar quente e frio") e estilos `.passos`, `.ar`, `.sequencia`. **Ainda não incorporada à `main`.**
- Branch `feat/erikmm_radar-area-maior_20261004` (a partir da `main`): **radar cobre área maior.** Grade 9x9 com passo de 1,5° (~1300 km, antes 7x7 com 1°, ~660 km, que aparecia como um quadrado pequeno no mapa) e o mapa agora enquadra a grade com `fitBounds`. **Ainda não incorporada à `main`.**
- Branch `feat/erikmm_radar-todo-mapa_20261004` (a partir da branch `radar-area-maior`, da qual depende): **radar cobre todo o mapa visível.** Em vez de uma grade fixa em volta da cidade, a grade 10x7 cobre a área visível do mapa (+25% de margem) e é pedida de novo ao arrastar ou dar zoom (atraso de 700 ms, respostas antigas descartadas, zoom mínimo 5). A cidade pesquisada vai como ponto extra na mesma chamada e alimenta o resumo por dia. Linhas da grade espaçadas na projeção Mercator, como o Leaflet estica a imagem. **Ainda não incorporada à `main`.**
- Branch `feat/erikmm_radar-mapa-travado_20261004` (a partir da branch `radar-todo-mapa`): **mapa travado no lugar pesquisado, para gastar menos dados.** Sem arrastar, zoom nem botões de zoom; a grade 10x7 cobre a área visível e é pedida **uma vez por busca** (antes recarregava a cada movimento). **Ainda não incorporada à `main`.**
- Branch `feat/erikmm_galeria-carrossel_20261003`: **galeria moderna.** Carrossel cinematográfico com deslize lateral (scroll-snap, arrastar com mouse, setas e teclado), chips de filtro por tipo (Fracos, Fortes, Landspout/tromba-d'água, Formação, Danos, Brasil), miniaturas e barra de progresso; clique na foto em destaque abre popup (`<dialog>`) com anterior/próxima, contador, ESC, clique no fundo, swipe e pré-carga da vizinha. Respeita `prefers-reduced-motion` (usa `behavior: "instant"`, pois `"auto"` herdaria o `scroll-behavior: smooth` do CSS). **Ainda não incorporada à `main`.**
- Branch `feat/erikmm_integra-radar-galeria-regioes_20261004` (a partir da branch `supercelula-ar-quente-frio`, com merge das branches `radar-mapa-travado` e `galeria-carrossel`): **junta tudo e acrescenta os tornados mais fortes por região.** Traz o radar de mapa travado, a galeria em carrossel e as seções Supercélula e Ar quente e frio. Nova seção `#regioes` (dados em `regioes` no `script.js`, cards `.regiao`, link "Regiões" no menu) com um tornado por região: América do Norte (Bridge Creek-Moore 1999), América do Sul (San Justo 1973), Brasil (Itu 1991 e Rio Bonito do Iguaçu 2025), Europa (Palluel 1967), Ásia (Daulatpur-Saturia 1989), África (oThongathi 2024), Oceania (Bowen 1876 e Frankton 1948). Classificações antigas são estimativas e variam por fonte. **Ainda não incorporada à `main`.**
- Branch `feat/erikmm_alertas-defesa-civil_20261004` (a partir da branch `integra-radar-galeria-regioes`): **alertas da Defesa Civil.** Nova seção `#alertas` (após o radar, link "Alertas" no menu) com as três cores (Amarelo/Perigo potencial, Laranja/Perigo, Vermelho/Grande perigo: risco, referência de vento e chuva, o que significa e o que fazer) e os alertas de celular (severo 🔔 e extremo 🚨, SMS 40199, telefone 199). Dados em `alertasCores` e `alertasCelular` no `script.js`; estilos `.alerta*`. Os símbolos são emojis/selos coloridos, não o logotipo oficial. Tornado não tem cor própria: entra nos alertas de tempestade. **Ainda não incorporada à `main`.**

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
| `feat/erikmm_supercelula-ar-quente-frio_20261004` | seções Supercélula e Ar quente e frio + menu | não |
| `feat/erikmm_radar-area-maior_20261004` | radar com grade maior (9x9, 1,5°) e fitBounds | não |
| `feat/erikmm_radar-todo-mapa_20261004` | grade sobre toda a área visível, recarregando ao mover o mapa | não |
| `feat/erikmm_radar-mapa-travado_20261004` | mapa travado na cidade pesquisada, um pedido por busca | não |
| `feat/erikmm_integra-radar-galeria-regioes_20261004` | radar travado + galeria carrossel + supercélula/ar quente e frio + tornados por região | não |
| `feat/erikmm_alertas-defesa-civil_20261004` | tudo da integração + seção Alertas da Defesa Civil | não |
| `feat/erikmm_galeria-carrossel_20261003` | galeria em carrossel com filtros e popup | não |

Atualizar esta seção a cada nova alteração.

Lição: uma quebra de linha literal dentro de uma string JS (`"..."`) derruba o `script.js` inteiro. Ao colar créditos/legendas vindos de fontes externas (ex.: Wikimedia), tirar quebras de linha.
