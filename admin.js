const tableBody = document.getElementById("pesan-body");

// log di layar HP
const logBox = document.createElement("div");
logBox.className = "log-box";
document.body.appendChild(logBox);
function log(text) {
  logBox.innerText += "\n" + text;
}

log("📡 Mulai fetch pesan...");

fetch("https://admin-villain.vercel.app/api/pesan")
  .then(res => {
    log("✅ Response: " + res.status);
    return res.json();
  })
  .then(data => {
    log("📦 Data: " + JSON.stringify(data));

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="3">Belum ada pesan masuk.</td></tr>';
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
    log("❌ Error: " + err.message);
    tableBody.innerHTML = '<tr><td colspan="3">❌ Gagal memuat data</td></tr>';
  });
