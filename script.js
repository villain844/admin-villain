const API = "https://sheetdb.io/api/v1/vmf2cfpzd8dpr";
let editingId = null;

function loadProducts() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("productList");
      list.innerHTML = "";

      data.forEach(item => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
          <img src="${item.foto}" />
          <p><strong>ID:</strong> ${item.id}</p>
          <p><strong>Nama:</strong> ${item.nama}</p>
          <p><strong>Harga:</strong> ${item.harga}</p>
          <p><strong>Stok:</strong> ${item.stok}</p>
          <p><strong>Diskon:</strong> ${item.diskon || "0"}%</p>
          <p><strong>Deskripsi:</strong> ${item.deskripsi}</p>
          <div class="actions">
            <button class="edit-btn" data-id="${item.id}">Edit</button>
            <button class="delete-btn" onclick="hapusProduk('${item.id}')">Hapus</button>
          </div>
        `;
        list.appendChild(div);
      });

      // ⛓ Tambahkan event listener Edit setelah produk dimuat
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          editProduk(id);
        });
      });
    });
}

loadProducts();

// Form Submit
document.getElementById("addProductForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    foto: form.foto.value,
    nama: form.nama.value,
    stok: form.stok.value,
    harga: form.harga.value,
    diskon: form.diskon.value,
    deskripsi: form.deskripsi.value
  };

  if (editingId) {
    fetch(`${API}/id/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    }).then(() => {
      alert("Berhasil diubah!");
      editingId = null;
      form.reset();
      form.querySelector("button").textContent = "Kirim Produk";
      loadProducts();
    });
  } else {
    const res = await fetch(API);
    const list = await res.json();
    const lastId = Math.max(0, ...list.map(i => +i.id || 0));
    const newId = (lastId + 1).toString();
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { id: newId, ...data } })
    }).then(() => {
      alert("Produk berhasil ditambah!");
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
      window.scrollTo({ top: form.offsetTop - 50, behavior: "smooth" });
    });
}

// Hapus Produk
function hapusProduk(id) {
  if (confirm("Hapus produk ini?")) {
    fetch(`${API}/id/${id}`, { method: "DELETE" }).then(() => loadProducts());
  }
}
