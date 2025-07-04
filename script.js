const API = "https://sheetdb.io/api/v1/vmf2cfpzd8dpr";

// Tampilkan semua produk
window.addEventListener("DOMContentLoaded", () => {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("productList");
      container.innerHTML = "";
      if (data.length === 0) {
        container.innerHTML = "<p>Tidak ada produk.</p>";
      } else {
        data.forEach((item, i) => {
          const card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `
            <img src="${item.foto}" alt="${item.nama}" />
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>Nama:</strong> ${item.nama}</p>
            <p><strong>Stok:</strong> ${item.stok}</p>
            <p><strong>Harga:</strong> ${item.harga}</p>
            <p><strong>Diskon:</strong> ${item.diskon}%</p>
            <p><strong>Deskripsi:</strong> ${item.deskripsi}</p>
          `;
          container.appendChild(card);
        });
      }
    })
    .catch(() => {
      document.getElementById("productList").innerHTML = "<p>Gagal memuat produk.</p>";
    });
});

// Reset ID
function resetIdProduk() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      let i = 1;
      data.forEach(item => {
        fetch(`${API}/id/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: { id: i } })
        });
        i++;
      });
      alert("ID produk berhasil direset!");
    });
}

// Logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
