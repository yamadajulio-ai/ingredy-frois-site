# Site Ingredy Frois - Psicologia

Site profissional da psicologa Ingredy Frois.
**Dominio:** ingredyfrois.com.br

## Stack

- HTML5, CSS3 e JavaScript puro (sem frameworks, sem build tools)
- Hospedado no GitHub Pages com dominio customizado (arquivo `CNAME`)

## Estrutura de Pastas

```
├── css/style.css           # Estilos do site inteiro
├── js/main.js              # Menu mobile, animacoes, widget WhatsApp
├── index.html              # Homepage
├── sobre.html              # Sobre a Ingredy
├── abordagens.html         # Abordagens terapeuticas
├── formacoes.html          # Formacoes e certificacoes
├── investimento.html       # Valores e pacotes
├── contato.html            # Pagina de contato
├── depressao.html          # Especialidade: depressao
├── transtorno-bipolar.html # Especialidade: transtorno bipolar
├── landing-page.html       # Landing page alternativa
├── sitemap.xml             # Sitemap para SEO
├── robots.txt              # Configuracao para crawlers
└── CNAME                   # Dominio customizado (ingredyfrois.com.br)
```

## Paleta de Cores (CSS Custom Properties em `:root`)

| Variavel         | Valor     | Descricao      |
|------------------|-----------|----------------|
| `--primary`      | `#5B7B6F` | Verde salvia   |
| `--primary-dark` | `#4A6A5E` | Verde escuro   |
| `--accent`       | `#C8A96E` | Dourado        |
| `--dark`         | `#2D3436` | Texto escuro   |
| `--text`         | `#4A4A4A` | Texto padrao   |
| `--bg`           | `#F5F0E8` | Fundo bege     |
| `--white`        | `#FAFAF5` | Branco suave   |

## Fontes (Google Fonts)

- **DM Sans** — corpo do texto
- **Playfair Display** — titulos (h1 a h4)

## SEO

- `sitemap.xml` com todas as paginas
- `robots.txt` permitindo todos os crawlers
- JSON-LD structured data em cada pagina HTML (tipos: LocalBusiness, ProfilePage, MedicalWebPage, FAQPage, ItemList)

## Imagens Principais

- `IMG_2503.JPEG` — foto hero da homepage (circulo com CSS)
- `IMG_4668.JPG.jpeg` — foto da secao "sobre" na homepage
- `logo-if.svg` / `logo-if.png` — logo do site
- Favicons: `favicon.ico`, `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`

## Como Editar

1. Clone ou baixe o repositorio
2. Abra qualquer arquivo HTML em um editor de texto
3. O CSS esta todo em `css/style.css` e o JS em `js/main.js`
4. Para testar localmente, abra o `index.html` no navegador
5. Para deploy no GitHub Pages, basta fazer push para a branch `main`

## Cache Bust

Os arquivos CSS e JS sao referenciados com query string para cache bust (ex: `style.css?v=6`). Ao fazer alteracoes significativas, incremente o numero da versao nos links dentro dos HTMLs.
