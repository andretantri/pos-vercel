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

    // Hitung signature sesuai dokumentasi Duitku:
    // MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
    const signatureStr = `${merchantCode}${invoiceNo}${amount}${apiKey}`;
    const signature = crypto.createHash('md5').update(signatureStr).digest('hex');

    // Waktu expiry dalam menit (opsional, contoh: 60 menit)
    const expiryPeriod = 60; 

    // Payload untuk dikirim ke Duitku
    const payload = {
      merchantCode: merchantCode,
      paymentAmount: parseInt(amount),
      paymentMethod: 'VC', // Contoh: Credit Card, atau 'M2' untuk Mandiri VA, 'B1' BCA VA. Biarkan kosong jika redirect ke Payment Page Duitku, tapi Duitku API v2 membutuhkan paymentMethod jika langsung.
      // Jika ingin diarahkan ke halaman pembayaran Duitku (Payment Page), kita pakai API Create Invoice
      merchantOrderId: invoiceNo,
      productDetails: `Pembayaran Invoice ${invoiceNo}`,
      email: 'customer@example.com', // Opsional tapi sering diwajibkan, sesuaikan jika ada
      phoneNumber: '08123456789', // Opsional
      additionalParam: '',
      merchantUserInfo: '',
      customerVaName: 'Customer', // Nama yang muncul di VA
      callbackUrl: `https://${req.headers.host}/api/callback`,
      returnUrl: `https://${req.headers.host}/`,
      signature: signature,
      expiryPeriod: expiryPeriod
    };

    // Duitku Sandbox URL (gunakan https://passport.duitku.com/webapi/api/merchant/v2/inquiry untuk production)
    const duitkuUrl = 'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry';

    const response = await fetch(duitkuUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
