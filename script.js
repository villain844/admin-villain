const produkAPI = "https://sheetdb.io/api/v1/vmf2cfpzd8dpr";
const pesanAPI = "https://sheetdb.io/api/v1/hkydnwssgudey";

// Tambah Produk
const addForm = document.getElementById("addProductForm");
if (addForm) {
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(addForm));
    const response = await fetch(produkAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: data }),
    });
    alert("Produk berhasil ditambahkan!");
    addForm.reset();
  });
}

// Edit Produk
const editForm = document.getElementById("editProductForm");
if (editForm) {
  const select = editForm.querySelector("select");

  fetch(produkAPI)
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = `${item.id} - ${item.nama}`;
        select.appendChild(opt);
      });
    });

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = select.value;
    const data = Object.fromEntries(new FormData(editForm));
    delete data.id;

    const response = await fetch(`${produkAPI}/id/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    alert("Produk berhasil diupdate!");
    editForm.reset();
  });
}

// Delete Produk
const deleteForm = document.getElementById("deleteProductForm");
if (deleteForm) {
  const select = deleteForm.querySelector("select");

  fetch(produkAPI)
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = `${item.id} - ${item.nama}`;
        select.appendChild(opt);
      });
    });

  deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = select.value;
    const response = await fetch(`${produkAPI}/id/${id}`, { method: "DELETE" });
    alert("Produk berhasil dihapus!");
    deleteForm.reset();
  });
}

// List Produk
const produkList = document.getElementById("produkList");
if (produkList) {
  fetch(produkAPI)
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.nama}</td>
          <td>${item.harga}</td>
          <td>${item.stok}</td>
          <td>${item.diskon || "-"}</td>
        `;
        produkList.appendChild(row);
      });
    });
}

// List Pesan
const pesanList = document.getElementById("pesanList");
if (pesanList) {
  fetch(pesanAPI)
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const div = document.createElement("div");
        div.className = "pesan-item";
        div.innerHTML = `<strong>${item.nama}</strong><br>${item.pesan}`;
        pesanList.appendChild(div);
      });
    });
}

// Hapus Pesan
const hapusPesanForm = document.getElementById("hapusPesanForm");
if (hapusPesanForm) {
  const select = hapusPesanForm.querySelector("select");

  fetch(pesanAPI)
    .then(res => res.json())
    .then(data => {
      data.forEach((item, index) => {
        const opt = document.createElement("option");
        opt.value = index + 1;
        opt.textContent = `${index + 1} - ${item.nama}`;
        select.appendChild(opt);
      });
    });

  hapusPesanForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const index = parseInt(select.value) - 1;

    // Ambil semua data dulu
    const res = await fetch(pesanAPI);
    const all = await res.json();

    // Hapus yang dipilih
    all.splice(index, 1);

    // Hapus semua
    await fetch(pesanAPI, { method: "DELETE" });

    // Kirim ulang sisa data
    if (all.length > 0) {
      await fetch(pesanAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: all }),
      });
    }

    alert("Pesan berhasil dihapus!");
    location.reload();
  });
}
