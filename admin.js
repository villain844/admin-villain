const tableBody = document.getElementById("pesan-body");

fetch("https://admin-villain.vercel.app/api/pesan")
  .then(response => response.ok ? response.json() : Promise.reject("Gagal"))
  .then(data => {
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
  .catch(error => {
    tableBody.innerHTML = '<tr><td colspan="3">❌ Gagal memuat data</td></tr>';
    console.error(error);
  });
