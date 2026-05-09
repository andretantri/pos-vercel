import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { invoiceNo, amount, merchantCode, apiKey } = req.body;

    if (!invoiceNo || !amount || !merchantCode || !apiKey) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    // Menggunakan API Duitku POP (Payment Page Hosted)
    // Signature = SHA256(merchantCode + timestamp + apiKey)
    const timestamp = Date.now().toString();
    const signatureStr = `${merchantCode}${timestamp}${apiKey}`;
    const signature = crypto.createHash('sha256').update(signatureStr).digest('hex');

    // Payload untuk Duitku POP
    const payload = {
      paymentAmount: parseInt(amount),
      merchantOrderId: invoiceNo,
      productDetails: `Pembayaran Invoice ${invoiceNo}`,
      email: 'customer@example.com', // Opsional, bisa disesuaikan
      phoneNumber: '08123456789', // Opsional
      additionalParam: '',
      merchantUserInfo: '',
      customerVaName: 'Pelanggan',
      callbackUrl: `https://${req.headers.host}/api/callback`,
      returnUrl: `https://${req.headers.host}/`,
      expiryPeriod: 60, // 60 menit
      // Item details diperlukan untuk POP
      itemDetails: [
        {
          name: `Tagihan ${invoiceNo}`,
          price: parseInt(amount),
          quantity: 1
        }
      ],
      // Customer details diperlukan untuk POP
      customerDetail: {
        firstName: 'Pelanggan',
        lastName: '',
        email: 'customer@example.com',
        phoneNumber: '08123456789'
      }
    };

    // URL Duitku POP Sandbox
    // Gunakan https://api-prod.duitku.com/api/merchant/createInvoice untuk Production
    const duitkuUrl = 'https://api-sandbox.duitku.com/api/merchant/createInvoice';

    const response = await fetch(duitkuUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-duitku-signature': signature,
        'x-duitku-timestamp': timestamp,
        'x-duitku-merchantcode': merchantCode
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok && data.statusCode === '00') {
      // Sukses mendapat URL pembayaran
      return res.status(200).json({ 
        success: true, 
        paymentUrl: data.paymentUrl,
        reference: data.reference
      });
    } else {
      // Gagal dari Duitku
      return res.status(400).json({ 
        success: false, 
        message: data.statusMessage || 'Gagal membuat tagihan Duitku',
        errorDetails: data 
      });
    }

  } catch (error) {
    console.error('Error creating invoice:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
