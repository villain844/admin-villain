document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pesan-container");

  fetch("/api/pesan")
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      if (data.length === 0) {
        container.innerHTML = '<p class="empty">Belum ada pesan yang masuk.</p>';
      } else {
        data.forEach(item => {
          const div = document.createElement("div");
          div.className = "pesan";
          div.innerHTML = `
            <div class="nama">${item.nama}</div>
            <div class="isi">${item.pesan}</div>
          `;
          container.appendChild(div);
        });
      }
    })
    .catch(error => {
      container.innerHTML = '<p class="empty">Gagal memuat pesan.</p>';
      console.error("Fetch error:", error);
    });
});
