# Rychlebský canicross — prototyp homepage

Pracovní responzivní prototyp podle dokumentů:

- **RC WEB – MASTER zdroj – hlavní obsah pro Homepage**
- **RC 2026 Homepage texty**

Aktuální datum akce v prototypu: **3. 10. 2026**

## Jak web otevřít

1. Rozbal ZIP.
2. Otevři soubor `index.html` dvojklikem.
3. Web funguje bez instalace a bez internetu.

## Kde co měnit

### Texty a pořadí sekcí

Soubor: `index.html`

Například hlavní nadpis:

```html
<h1>Běžíme pro ty, kteří <em>domov ještě nemají.</em></h1>
```

### Barvy, velikosti a vzhled

Soubor: `style.css`

Hlavní barvy jsou úplně nahoře v části `:root`:

```css
--forest-900: #123c32;
--accent: #f0b456;
--accent-dark: #d66b42;
```

### Google Forms registrace

Soubor: `script.js`

Doplň veřejný odkaz:

```js
const REGISTRATION_URL = "SEM_VLOŽ_ODKAZ";
```

Pro vložení formuláře přímo do webu doplň embed URL:

```js
const GOOGLE_FORM_EMBED_URL = "SEM_VLOŽ_EMBED_ODKAZ";
```

Když jsou hodnoty prázdné, tlačítko zobrazí informační okno, že se registrace připravuje.

## Záměrné pracovní položky

Tyto údaje nejsou v podkladech definitivně schválené:

- startovné,
- uzávěrka registrace,
- přesný harmonogram,
- trasy a kategorie,
- kontaktní e-mail a telefon,
- finální loga a seznam partnerů,
- veřejný odkaz na Google Forms.

Proto je prototyp nevymýšlí a označuje je jako připravované.

## Struktura souborů

```text
rychlebsky-canicross-prototype/
├── index.html
├── style.css
├── script.js
└── README.md
```
