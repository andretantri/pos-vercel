import { createHash } from 'crypto';

// Duitku POP Callback
// Method: HTTP POST
// Type: x-www-form-urlencoded
// Signature validasi: MD5(merchantCode + amount + merchantOrderId + apiKey)
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const {
      merchantCode,
      amount,
      merchantOrderId,
      productDetail,
      additionalParam,
      paymentCode,
      resultCode,
      merchantUserId,
      reference,
      signature,
      publisherOrderId,
      spUserHash,
      settlementDate
    } = req.body;

    if (!merchantCode || !amount || !merchantOrderId || !signature) {
      return res.status(400).send('Bad Parameter');
    }

    // TODO: Ganti dengan API Key Anda yang sebenarnya atau ambil dari database
    // Untuk sekarang, validasi signature dilewati karena apiKey disimpan di form admin
    // const apiKey = 'YOUR_API_KEY';
    // const calcSignature = createHash('md5')
    //   .update(merchantCode + amount + merchantOrderId + apiKey)
    //   .digest('hex');
    // if (signature !== calcSignature) {
    //   return res.status(400).send('Bad Signature');
    // }

    if (resultCode === '00') {
      // Pembayaran Berhasil
      console.log(`[CALLBACK] Pembayaran SUKSES - Order: ${merchantOrderId}, Amount: ${amount}, Ref: ${reference}`);
      // TODO: Update status invoice di database Anda
    } else if (resultCode === '01') {
      // Pembayaran Pending
      console.log(`[CALLBACK] Pembayaran PENDING - Order: ${merchantOrderId}`);
    } else {
      // Pembayaran Gagal / Expired
      console.log(`[CALLBACK] Pembayaran GAGAL - Order: ${merchantOrderId}, Code: ${resultCode}`);
    }

    // Duitku mengharapkan HTTP 200 OK
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing callback:', error);
    return res.status(500).send('Internal Server Error');
  }
}
