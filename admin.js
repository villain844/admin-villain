const tableBody = document.getElementById("pesan-body");

// BUAT LOG DEBUG DI LAYAR
const logBox = document.createElement("div");
logBox.style.background = "#000";
logBox.style.color = "#0f0";
logBox.style.fontSize = "11px";
logBox.style.padding = "10px";
logBox.style.marginTop = "20px";
logBox.style.borderTop = "1px solid #0f0";
logBox.style.whiteSpace = "pre-wrap";
document.body.appendChild(logBox);

function log(text) {
  logBox.innerText += "\n" + text;
}

log("📡 Memulai fetch...");

fetch("https://admin-villain.vercel.app/api/pesan")
  .then(response => {
    log("✅ Response OK: " + response.ok);
    return response.json();
  })
  .then(data => {
    log("📦 Data: " + JSON.stringify(data));

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="3">❗ Tidak ada data</td></tr>';
      return;
    }

    tableBody.innerHTML = "";
    data.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama || '-'}</td>
        <td>${item.pesan || '-'}</td>
      `;
      tableBody.appendChild(tr);
    });
  })
  .catch(err => {
    log("❌ Fetch error: " + err.message);
    tableBody.innerHTML = '<tr><td colspan="3">❌ Gagal memuat data</td></tr>';
  });
