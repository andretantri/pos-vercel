export default function handler(req, res) {
  // Duitku akan mengirimkan POST request ke URL ini
  if (req.method === 'POST') {
    try {
      const { 
        merchantOrderId, 
        amount, 
        resultCode, 
        reference 
      } = req.body;

      // TODO: Validasi signature Duitku di sini untuk keamanan
      // const signature = ...

      if (resultCode === '00') {
        // Pembayaran Berhasil
        console.log(`Pembayaran sukses untuk Order ID: ${merchantOrderId}`);
        // TODO: Update status invoice di database Anda
      } else {
        // Pembayaran Gagal / Expired
        console.log(`Pembayaran gagal untuk Order ID: ${merchantOrderId}`);
      }

      // Duitku mengharapkan response HTTP 200 OK
      return res.status(200).json({ status: 'success' });
    } catch (error) {
      console.error('Error processing callback:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  } else {
    // Jika diakses via browser (GET request)
    return res.status(405).json({ message: 'Method Not Allowed. This endpoint is for Duitku POST callback.' });
  }
}
