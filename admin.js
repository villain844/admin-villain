const tableBody = document.getElementById("pesan-body");

// Ambil data dari SheetDB API
fetch("https://sheetdb.io/api/v1/5ni7a9sbf13p3")
  .then(response => response.json())
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="3">Belum ada pesan masuk.</td></tr>';
      return;
    }

    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama || '-'}</td>
        <td>${item.pesan || '-'}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Gagal memuat data:", error);
    tableBody.innerHTML = '<tr><td colspan="3">Gagal memuat data.</td></tr>';
  });