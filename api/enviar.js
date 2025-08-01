export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz-gMgpMg6V6ULADS3UpoPnZx1K2KJZdkSq2piTkVD2cxNQvLUITqOLPO4uqc-Nwm_zeA/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ status: 'error', mensaje: error.message });
    }
  } else {
    res.status(405).json({ mensaje: 'Método no permitido' });
  }
}
