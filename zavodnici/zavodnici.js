const PARTICIPANTS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTr_pswrGbIFKzalJmOo3Z7JaSc29xXAbO3NdzLWeTcwfCecFX_2bU8d7wcltDgbXhr5OLbUdB0IX3_/pub?gid=0&single=true&output=csv";

const participantsList = document.querySelector("#participants-list");
const participantsCount = document.querySelector("#participants-count");

const parseCSV = (text) => {
  const rows = [];
  let row = [];
  let cell = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const character = text[i];
    const nextCharacter = text[i + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        cell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (character === "," && !insideQuotes) {
      row.push(cell);
      cell = "";
    } else if (
      (character === "\n" || character === "\r") &&
      !insideQuotes
    ) {
      if (character === "\r" && nextCharacter === "\n") {
        i++;
      }

      row.push(cell);
      rows.push(row);

      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
};

const loadParticipants = async () => {
  try {
    const response = await fetch(PARTICIPANTS_CSV_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Nepodařilo se načíst startovní listinu.");
    }

    const csv = await response.text();
    const rows = parseCSV(csv);

    const participants = rows
      .slice(1)
      .filter((row) => row[0]?.trim());

    participantsList.innerHTML = "";

    participants.forEach((participant) => {
      const row = document.createElement("tr");

      participant.slice(0, 5).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value.trim();
        row.appendChild(cell);
      });

      participantsList.appendChild(row);
    });

    participantsCount.textContent = participants.length;
  } catch (error) {
    console.error(error);

    participantsList.innerHTML = `
      <tr>
        <td colspan="5">Startovní listinu se nepodařilo načíst.</td>
      </tr>
    `;
  }
};

loadParticipants();