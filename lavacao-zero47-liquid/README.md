# ZERO47 — Lavação Premium Liquid Glass

Projeto front-end com:
- visual dark/liquid glass;
- cards clicáveis com ícones SVG;
- cálculo automático de orçamento;
- troca visual do carro conforme o nível de sujeira;
- envio do resumo pelo WhatsApp.

## Estrutura

```txt
assets/
├── brand/
│   └── logo.svg
└── cars/
    ├── carro-limpo.png
    ├── carro-sujo.png
    └── carro-muito-sujo.png
```

## Onde trocar o WhatsApp

No arquivo `script.js`, altere:

```js
const numeroWhatsApp = "5547999999999";
```

Use formato internacional: `55 + DDD + número`.

## Onde trocar imagens

Troque os arquivos dentro de:

```txt
assets/cars/
```

Mantenha os nomes para não precisar alterar o código.

## Observação

Os cards usam SVG inline no HTML. Não tem emoji.
