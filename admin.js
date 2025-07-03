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
          div.className = "pesan-card";
          div.innerHTML = `
            <div class="pesan-header">
              <i class="fas fa-user-circle"></i>
              <span class="pesan-nama">${item.nama}</span>
            </div>
            <div class="pesan-body">
              <i class="fas fa-comment-dots"></i>
              <p class="pesan-teks">${item.pesan}</p>
            </div>
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
