# appTornado

Site estático em português (pt-BR), "Mundo dos Tornados": explica como os tornados se formam, a escala Fujita Melhorada (EF0 a EF5), tornados históricos, galeria, quiz e curiosidades. Projeto de estudo, sem build nem dependências: abrir `index.html` no navegador.

## Estrutura

- `index.html`: página única com as seções (o-que-e, categorias, historia, galeria, quiz, curiosidades).
- `style.css`: estilos.
- `script.js`: dados (categorias, tornados históricos, fotos, perguntas) e a renderização das seções.
- `imagens/`: `supercelula.webp`, `tornado-campo.jpg`, `tornado-formacao.webp`.
- `teste`: arquivo vazio, sem uso.

## Convenções

- Código e textos em português; JavaScript simples (sem frameworks).
- Git: nunca commitar direto na `main`. Cada alteração vai em uma branch nova, criada a partir da `main`, com o nome `feat/erikmm_<descricao>_<yyyyMMdd>` (descrição curta, minúsculas, com hífens; data do dia). Commitar na branch a cada passo. Não fazer merge na `main` sem o usuário pedir.

## Histórico do projeto

### 2026-10-03

- `e603bd4`: **Versão inicial do appTornado.** Site com menu, hero, seção "O que é um tornado?", categorias EF0 a EF5 clicáveis, linha do tempo de tornados históricos (1925 a 2015), galeria com ampliação, quiz e curiosidades. Está na `main`, marcada com a tag `v0-snapshot-20261003` (também na branch `feat/erikmm_snapshot-versao-atual_20261003`).
- `ccaa7a9`: **Simulador de destruição por categoria (EF0 a EF5).** Nova seção `#simulador` com `<canvas>`: o usuário escolhe a categoria e vê o tornado puxando do chão os objetos que ele consegue levar (o EF0 só leva coisas leves). Inclui link no menu e estilos `.sim-canvas`. Está na branch `feat/erikmm_simulador-destruicao_20261003`, **ainda não incorporada à `main`**.
- Branch `feat/erikmm_claude-md-historico_20261003`: criação deste `CLAUDE.md`.

### Estado das branches

| Branch | Conteúdo | Na `main`? |
|---|---|---|
| `main` | versão inicial | sim |
| `feat/erikmm_snapshot-versao-atual_20261003` | snapshot da versão inicial (mesmo commit da `main`) | sim |
| `feat/erikmm_simulador-destruicao_20261003` | simulador de destruição | não |
| `feat/erikmm_claude-md-historico_20261003` | `CLAUDE.md` | não |

Atualizar esta seção a cada nova alteração.
