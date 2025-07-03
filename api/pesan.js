export default async function handler(req, res) {
  const response = await fetch("https://sheetdb.io/api/v1/5ni7a9sbf13p3");
  const data = await response.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
