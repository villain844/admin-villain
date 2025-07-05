const API = "https://sheetdb.io/api/v1/vmf2cfpzd8dpr";
const list = document.getElementById("productList");
let editingId = null;

// Cek login
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Tampilkan Produk
function loadProducts() {
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
            <button class="edit-btn" data-id="${item.id}">Edit</button>
            <button class="delete-btn" onclick="hapusProduk('${item.id}')">Hapus</button>
          </div>
        `;
        list.appendChild(card);
      });

      // Pasang listener setelah produk dirender
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          editProduk(id);
        });
      });
    });
}

loadProducts();

// Tambah / Edit Produk
document.getElementById("addProductForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const data = {
    foto: formData.get("foto"),
    nama: formData.get("nama"),
    stok: formData.get("stok"),
    harga: formData.get("harga"),
    diskon: formData.get("diskon") || "0",
    deskripsi: formData.get("deskripsi")
  };

  if (editingId) {
    // mode EDIT
    fetch(`${API}/id/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    }).then(() => {
      alert("Produk berhasil diubah!");
      form.reset();
      editingId = null;
      form.querySelector("button").textContent = "Kirim Produk";
      loadProducts();
    });

  } else {
    // mode TAMBAH
    const res = await fetch(API);
    const list = await res.json();
    const lastId = Math.max(0, ...list.map(d => parseInt(d.id) || 0));
    const newId = (lastId + 1).toString();

    const newData = { id: newId, ...data };

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: newData })
    }).then(() => {
      alert("Produk berhasil ditambahkan!");
      form.reset();
      loadProducts();
    });
  }
});

// Edit Produk
function editProduk(id) {
  fetch(`${API}/id/${id}`)
    .then(res => res.json())
    .then(([item]) => {
      const form = document.getElementById("addProductForm");
      form.foto.value = item.foto;
      form.nama.value = item.nama;
      form.stok.value = item.stok;
      form.harga.value = item.harga;
      form.diskon.value = item.diskon;
      form.deskripsi.value = item.deskripsi;
      editingId = item.id;
      form.querySelector("button").textContent = "Update Produk";
      window.scrollTo({ top: form.offsetTop, behavior: "smooth" });
    });
}

// Hapus Produk
function hapusProduk(id) {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;
  fetch(`${API}/id/${id}`, { method: "DELETE" })
    .then(() => loadProducts());
}

// Reset ID
function resetIdProduk() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      let i = 1;
      const updatePromises = data.map(item => {
        return fetch(`${API}/id/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: { id: i++ } })
        });
      });
      Promise.all(updatePromises).then(() => {
        alert("ID berhasil direset!");
        loadProducts();
      });
    });
}

// Logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
    }
