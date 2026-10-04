# Mundo dos Tornados

Site educativo em português sobre tornados: como se formam, como são classificados e o que fazer nos alertas.
Projeto de estudo feito com HTML, CSS e JavaScript puros, sem build e sem dependências.

## O que tem no site

- **Entenda os tornados:** o que é um tornado, como o ar quente e frio se encontram e como funciona a supercélula.
- **Classificação:** escala Fujita Melhorada (EF0 a EF5) e simulador de destruição por categoria.
- **História:** tornados que marcaram o mundo e o mais forte de cada região.
- **Prevenção:** radar com previsão real de 3 dias (chuva, vento e energia de tempestade) e alertas da Defesa Civil.
- **Explore:** galeria de fotos reais, quiz e curiosidades.

## Como rodar

Abra o `index.html` no navegador. O radar precisa de internet (Open-Meteo, Leaflet e mapa Esri).

## Estrutura

| Arquivo | Para que serve |
|---|---|
| `index.html` | Página única com todas as seções |
| `css/style.css` | Estilos |
| `js/script.js` | Dados (categorias, história, regiões, alertas, quiz) e simulador |
| `js/galeria.js` | Galeria em carrossel |
| `js/radar.js` | Radar de previsão sobre mapa Leaflet |
| `imagens/` | Imagens do site (`hero/` e `galeria/`); autores e licenças em `imagens/CREDITOS.md` |

## Tecnologias e fontes de dados

- HTML, CSS e JavaScript (sem frameworks)
- [Leaflet](https://leafletjs.com/) e mapa base Esri
- [Open-Meteo](https://open-meteo.com/) para a previsão
- Fotos do [Wikimedia Commons](https://commons.wikimedia.org/)

## Como contribuir

Cada mudança nasce de uma issue e vai em uma branch própria, com nome `feat/<descricao>_<aaaammdd>`, e entra por pull request. Veja os modelos em `.github/`.

## Aviso

O radar mostra uma previsão de modelo, não o eco de um radar real, e não prevê tornados. Em caso de alerta, siga a Defesa Civil.
