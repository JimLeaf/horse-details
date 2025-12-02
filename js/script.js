const horses = [
  { id: "name1" },
  { id: "name2" },
  { id: "name3" }
];

document.addEventListener("DOMContentLoaded", () => {
  const cardRow = document.querySelector(".card-row");
  horses.forEach((horse, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="circle"></div>
      <div class="dropdown-wrapper">
        <select class="horse-select-${index}" onchange="updateSelections()">
          <option></option>
          <option>Oguri Cap</option>
          <option>Special Week</option>
          <option>Super Creek</option>
          <option>Grass Wonder</option>
          <option>Taiki Shuttle</option>
        </select>
      </div>
      ${["Track", "Distance", "Style"].map(label => `
        <div class="attribute-row">
          <div class="attribute-label">${label}</div>
          <div class="grid">
            ${[1, 2, 3, ...(label === "Style" ? [4] : [])].map((i, idx) => `
              <div class="image-button-wrapper">
                <button class="image-button" onclick="toggleExclusive(this)">
                  ${label === "Track" && idx === 0 ? `<img src="images/track1.png" alt="Track Icon" />` : ""}
                </button>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `;
    cardRow.appendChild(card);
  });

  // Initialize Select2
  horses.forEach((horse, index) => {
    const selector = `.horse-select-${index}`;
    $(selector).select2({
      width: '100%',
      placeholder: `Select Horse ${index + 1}`,
      minimumResultsForSearch: 0
    });
  });
});

// Ensure unique selections across dropdowns
function updateSelections() {
  const allSelects = document.querySelectorAll("select");
  const selectedValues = Array.from(allSelects)
    .map(sel => sel.value)
    .filter(val => val !== "");

  allSelects.forEach(sel => {
    Array.from(sel.options).forEach(opt => {
      if (opt.value && selectedValues.includes(opt.value) && sel.value !== opt.value) {
        opt.disabled = true;
      } else {
        opt.disabled = false;
      }
    });
  });

  // Refresh Select2
  $("select").each(function() {
    $(this).select2({
      width: '100%',
      minimumResultsForSearch: 0
    });
  });
}

function toggleExclusive(button) {
  const row = button.closest('.grid');
  row.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}
