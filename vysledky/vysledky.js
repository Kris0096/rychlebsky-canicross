// Finální výsledky Rychlebského canicrossu 2026 (3. 10. 2026).
// Shodný čas = shodné pořadí.
const RESULTS = [
  { bib: 30, name: "Michal Verner", dog: "Espresso", club: "Canicross Jeseník", category: "Muži – pes nad 20 kg", time: "18:38" },
  { bib: 20, name: "Martina Macková", dog: "Démon", club: "Canicross Jeseník", category: "Ženy – pes nad 20 kg", time: "23:31" },
  { bib: 2, name: "Martina Kocourková", dog: "Cassie Moravská kometa", club: "Canicross Jeseník", category: "Ženy – pes nad 20 kg", time: "24:53" },
  { bib: 12, name: "Matěj Praus", dog: "Máša", club: "Kurňa Team Kolnovice", category: "Muži – pes do 20 kg", time: "25:58" },
  { bib: 13, name: "Pavlína Holubová", dog: "Bella", club: "Šumperský Canicross", category: "Ženy – pes nad 20 kg", time: "25:58" },
  { bib: 17, name: "Lucie Binarová", dog: "Sally", club: "Canicross Šumperk", category: "Ženy – pes do 20 kg", time: "26:55" },
  { bib: 6, name: "Daniel Vojáček", dog: "Lima", club: "Jeseník", category: "Muži – pes do 20 kg", time: "27:55" },
  { bib: 26, name: "Elen Marie Koláčkova", dog: "Roxy", club: "Hlavně doběhniii", category: "Ženy – pes nad 20 kg", time: "28:41" },
  { bib: 5, name: "Jan Čada", dog: "Doris", club: "Rychlé Hnáty", category: "Muži – pes do 20 kg", time: "28:48" },
  { bib: 11, name: "Kamila Šťastná", dog: "Arón", club: "Vidnava", category: "Ženy – pes nad 20 kg", time: "30:04" },
  { bib: 7, name: "Dominika Kvapilová", dog: "Tiffany Ikemark", club: "Ikemark Kamenička", category: "Ženy – pes do 20 kg", time: "30:40" },
  { bib: 29, name: "Marie Bošková", dog: "Striker Carcassonne Tolugo", club: "Canicross Jeseník", category: "Ženy – pes nad 20 kg", time: "31:02" },
  { bib: 3, name: "Markéta Toroni", dog: "Yukki", club: "Canicross Šumperk", category: "Ženy – pes do 20 kg", time: "32:00" },
  { bib: 18, name: "Bára Smatanová", dog: "Ennie", club: "Canicross Jeseník", category: "Ženy – pes nad 20 kg", time: "32:06" },
  { bib: 21, name: "Barbora Gálová", dog: "Apollo", club: "Ostrava", category: "Ženy – pes nad 20 kg", time: "32:33" },
  { bib: 15, name: "Jakub Škrabal", dog: "Kofi Vlčí tlapka", club: "Stará Červená Voda", category: "Muži – pes nad 20 kg", time: "33:01" },
  { bib: 27, name: "Marta Ryzí", dog: "Bára", club: "", category: "Ženy – pes nad 20 kg", time: "34:49" },
  { bib: 28, name: "Dorotka Marková", dog: "Dante", club: "Vidnava", category: "Ženy – pes nad 20 kg", time: "36:30" },
  { bib: 8, name: "Markéta Žeberová", dog: "Brownie", club: "Ostrava", category: "Ženy – pes do 20 kg", time: "36:36" },
  { bib: 14, name: "Romana Labounková", dog: "", club: "", category: "Ženy – pes nad 20 kg", time: "37:41" },
  { bib: 23, name: "Barbora Zappeová", dog: "Joyce", club: "", category: "Ženy – pes nad 20 kg", time: "38:24" },
  { bib: 10, name: "Martina Skřebská", dog: "Tami", club: "Olomouc", category: "Ženy – pes nad 20 kg", time: "38:32" },
  { bib: 16, name: "Pavlína Šimonová", dog: "Rozárka", club: "Hradec-Nová Ves", category: "Ženy – pes nad 20 kg", time: "1:27:30" },
];

// Nedokončili (DNF) – v tabulce na konci své kategorie, bez pořadí.
const DNF = [
  { bib: 24, name: "Adéla Šíblová", dog: "Nikosz", club: "Mikulovice u Jeseníku", category: "Ženy – pes do 20 kg" },
  { bib: 25, name: "Nikol Nepožitková", dog: "Eduard", club: "Mikulovice u Jeseníku", category: "Ženy – pes do 20 kg" },
];

const CATEGORIES = [
  "Muži – pes do 20 kg",
  "Muži – pes nad 20 kg",
  "Ženy – pes do 20 kg",
  "Ženy – pes nad 20 kg",
];

const toSeconds = (time) =>
  time.split(":").map(Number).reduce((total, part) => total * 60 + part, 0);

// Pořadí s podporou shodných časů (např. 4., 4., 6.).
const rank = (list) => {
  const sorted = [...list].sort((a, b) => toSeconds(a.time) - toSeconds(b.time));
  return sorted.map((item, index) => {
    const first = sorted.findIndex((other) => other.time === item.time);
    return { ...item, place: (first === -1 ? index : first) + 1 };
  });
};

const overall = rank(RESULTS);
const categoryPlace = new Map();
CATEGORIES.forEach((category) => {
  rank(RESULTS.filter((r) => r.category === category)).forEach((r) =>
    categoryPlace.set(r.bib, r.place)
  );
});

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

// Pes a tým pod jménem závodníka.
const details = (r) =>
  [r.dog, r.club].filter(Boolean).map(escapeHTML).join(" · ");

const placeBadge = (place) =>
  place <= 3
    ? `<span class="results-place results-place-${place}">${place}.</span>`
    : `<span class="results-place">${place}.</span>`;

// Vítězové kategorií
const winnersEl = document.querySelector("#results-winners");
winnersEl.innerHTML = CATEGORIES.map((category) => {
  const podium = rank(RESULTS.filter((r) => r.category === category)).slice(0, 3);
  const [winner, ...rest] = podium;
  return `
    <article class="results-winner-card">
      <small>${escapeHTML(category)}</small>
      <strong>${escapeHTML(winner.name)}</strong>
      ${details(winner) ? `<p class="results-details">${details(winner)}</p>` : ""}
      <span class="results-winner-time">${winner.time}</span>
      ${
        rest.length
          ? `<ol start="2">${rest
              .map((r) => `<li>${escapeHTML(r.name)} <span>${r.time}</span></li>`)
              .join("")}</ol>`
          : ""
      }
    </article>`;
}).join("");

// Tabulka a filtr
const listEl = document.querySelector("#results-list");
const filterEl = document.querySelector("#results-filter");
let activeCategory = "";

const renderTable = () => {
  const inCategory = (r) => !activeCategory || r.category === activeCategory;
  const rows = overall.filter(inCategory).concat(DNF.filter(inCategory));
  listEl.innerHTML = rows
    .map(
      (r) => `
      <tr>
        <td data-label="Pořadí">${r.place ? placeBadge(r.place) : ""}</td>
        <td data-label="Závodník"><strong>${escapeHTML(r.name)}</strong>${
          details(r) ? `<span class="results-details">${details(r)}</span>` : ""
        }</td>
        <td data-label="Kategorie">${escapeHTML(r.category)}</td>
        <td data-label="V kategorii">${r.place ? `${categoryPlace.get(r.bib)}.` : ""}</td>
        <td data-label="Číslo">${r.bib}</td>
        <td data-label="Čas" class="results-time">${r.time || "DNF"}</td>
      </tr>`
    )
    .join("");
};

const renderFilter = () => {
  const options = [{ value: "", label: "Všichni" }].concat(
    CATEGORIES.map((c) => ({ value: c, label: c }))
  );
  filterEl.innerHTML = options
    .map(
      (o) =>
        `<button type="button" data-category="${escapeHTML(o.value)}" aria-pressed="${
          o.value === activeCategory
        }">${escapeHTML(o.label)}</button>`
    )
    .join("");
};

filterEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilter();
  renderTable();
});

renderFilter();
renderTable();
