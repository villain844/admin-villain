fetch("https://sheetdb.io/api/v1/hkydnwssgudey")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("pesan-container");
    if (!container) return;
    container.innerHTML = "";

    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.pesan}</td>
      `;
      container.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Gagal ambil data:", error);
  });
