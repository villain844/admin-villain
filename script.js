const API = "https://sheetdb.io/api/v1/vmf2cfpzd8dpr";
const list = document.getElementById("productList");

// Tampilkan Produk
fetch(API)
  .then(res => res.json())
  .then(data => {
    list.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${item.foto}" />
        <p><strong>ID:</strong> ${item.id}</p>
        <p><strong>Nama:</strong> ${item.nama}</p>
        <p><strong>Stok:</strong> ${item.stok}</p>
        <p><strong>Harga:</strong> ${item.harga}</p>
        <p><strong>Diskon:</strong> ${item.diskon}%</p>
        <p><strong>Deskripsi:</strong> ${item.deskripsi}</p>
        <div class="actions">
          <button class="edit-btn" onclick="editProduk('${item.id}')">Edit</button>
          <button class="delete-btn" onclick="hapusProduk('${item.id}')">Hapus</button>
        </div>
      `;
      list.appendChild(card);
    });
  });

// Tambah Produk (ID berurutan)
document.getElementById("addProductForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const res = await fetch(API);
  const data = await res.json();
  const lastId = Math.max(0, ...data.map(d => parseInt(d.id) || 0));
  const newId = (lastId + 1).toString();

  const newData = {
    id: newId,
    foto: formData.get("foto"),
    nama: formData.get("nama"),
    stok: formData.get("stok"),
    harga: formData.get("harga"),
    diskon: formData.get("diskon") || "0",
    deskripsi: formData.get("deskripsi")
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: newData })
  });

  alert("Produk berhasil ditambahkan!");
  form.reset();
  location.reload();
});

// Hapus Produk
function hapusProduk(id) {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;
  fetch(`${API}/id/${id}`, { method: "DELETE" })
    .then(() => location.reload());
}

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
      alert("ID berhasil direset!");
      setTimeout(() => location.reload(), 1000);
    });
}

// Logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
