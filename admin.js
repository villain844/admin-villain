fetch("https://sheetdb.io/api/v1/hkydnwssgudey")
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("pesanList");
    data.forEach((item, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${item.nama || '-'}</td>
        <td>${item.pesan || '-'}</td>
      `;
      tbody.appendChild(row);
    });
  });
