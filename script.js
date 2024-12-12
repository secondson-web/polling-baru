const categories = [
  "PALING DRAMA QUEEN / KING",
  "PELAWAK TERSELUBUNG",
  "MASTERCHEF MENDADAK",
  "Mr / Mrs MOOD SWING",
  "JAGONYA GOSIP",
  "MANUSIA SERBA BISA",
  "PANDAI BERHEMAT",
  "SANG PETUALANG",
  "PENGUASA PANGGUNG KARAOKE",
];

const names = [
  "NAMI",
  "RITA",
  "PRI",
  "NANAT",
  "LULU",
  "UYUY",
  "NUR",
  "ARDEN",
  "FACHRIL",
];

document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll(".category-select");

  // Populate options
  selects.forEach((select) => {
    names.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });

    select.addEventListener("change", updateOptions);
  });

  // Update options to disable selected names
  function updateOptions() {
    const selectedValues = Array.from(selects).map((s) => s.value);

    selects.forEach((select) => {
      Array.from(select.options).forEach((option) => {
        if (
          selectedValues.includes(option.value) &&
          option.value !== select.value
        ) {
          option.disabled = true;
        } else {
          option.disabled = false;
        }
      });
    });
  }

  // Handle form submission
  document.getElementById("pollForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {};
    selects.forEach((select, index) => {
      data[categories[index]] = select.value || "Belum dipilih";
    });

    // Kirim hasil polling ke GitHub melalui GitHub API
    const response = await fetch(
      "https://api.github.com/repos/secondson-web/polling-app/contents/results.json",
      {
        method: "PUT",
        headers: {
          Authorization: `token Y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`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update polling results",
          content: btoa(JSON.stringify(data, null, 2)),
        }),
      }
    );

    if (response.ok) {
      document.getElementById("resultMessage").style.display = "block";
    } else {
      alert("Gagal mengirim hasil polling!");
    }
  });
});
