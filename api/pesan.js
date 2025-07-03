export default async function handler(req, res) {
  try {
    const response = await fetch('https://sheetdb.io/api/v1/hkydnwssgudey');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data dari SheetDB' });
  }
}
