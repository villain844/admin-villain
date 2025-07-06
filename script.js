// Proteksi login otomatis
if (window.location.pathname !== "/login.html") {
  if (localStorage.getItem("admin_login") !== "true") {
    window.location.href = "login.html";
  }
}

// Fungsi logout
function logout() {
  localStorage.removeItem("admin_login");
  window.location.href = "login.html";
}

// Tambah produk
function tambahProduk(event) {
  event.preventDefault();

  const data = {
    id: Date.now(),
    foto: document.getElementById("foto").value,
    nama: document.getElementById("nama").value,
    stok: document.getElementById("stok").value,
    harga: document.getElementById("harga").value,
    diskon: document.getElementById("diskon").value,
    deskripsi: document.getElementById("deskripsi").value,
    order: document.getElementById("order").value
  };

  fetch("https://sheetdb.io/api/v1/vmf2cfpzd8dpr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  })
    .then(res => res.json())
    .then(() => {
      alert("Produk berhasil ditambahkan!");
      document.getElementById("form-produk").reset();
    })
    .catch(() => alert("Gagal menambahkan produk"));
}

// Simpan background
function pilihBackground(url) {
  const data = {
    id: "1",
    background: url
  };

  fetch("https://sheetdb.io/api/v1/wdiag49r7wv0s/id/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  })
    .then(() => {
      alert("Background berhasil diubah");
      location.reload();
    })
    .catch(() => alert("Gagal menyimpan background"));
}

// Hapus produk
function hapusProduk(id) {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;

  fetch(`https://sheetdb.io/api/v1/vmf2cfpzd8dpr/id/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      alert("Produk berhasil dihapus");
      location.reload();
    })
    .catch(() => alert("Gagal menghapus produk"));
}

// Edit produk
function editProduk(id, dataBaru) {
  fetch(`https://sheetdb.io/api/v1/vmf2cfpzd8dpr/id/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: dataBaru })
  })
    .then(() => {
      alert("Produk berhasil diupdate");
      location.reload();
    })
    .catch(() => alert("Gagal mengedit produk"));
}

// Ambil produk
function ambilProduk(callback) {
  fetch("https://sheetdb.io/api/v1/vmf2cfpzd8dpr")
    .then(res => res.json())
    .then(data => callback(data));
}

// Ambil background
function ambilBackground(callback) {
  fetch("https://sheetdb.io/api/v1/wdiag49r7wv0s")
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) callback(data[0].background);
    });
}

// Ambil pesan pelanggan
function ambilPesan(callback) {
  fetch("https://sheetdb.io/api/v1/hkydnwssgudey")
    .then(res => res.json())
    .then(data => callback(data));
}

// Hapus pesan pelanggan
function hapusPesan(id) {
  if (!confirm("Yakin ingin menghapus pesan ini?")) return;

  fetch(`https://sheetdb.io/api/v1/hkydnwssgudey/id/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      alert("Pesan berhasil dihapus");
      location.reload();
    })
    .catch(() => alert("Gagal menghapus pesan"));
}
