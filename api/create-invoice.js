import { createHash } from 'crypto';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { invoiceNo, amount, merchantCode, apiKey } = req.body;

    if (!invoiceNo || !amount || !merchantCode || !apiKey) {
      return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
    }

    // Duitku POP: Signature = SHA256(merchantCode + timestamp + apiKey)
    const timestamp = Date.now().toString();
    const signature = createHash('sha256')
      .update(merchantCode + timestamp + apiKey)
      .digest('hex');

    const payload = {
      paymentAmount: parseInt(amount),
      merchantOrderId: invoiceNo,
      productDetails: `Pembayaran Invoice ${invoiceNo}`,
      email: 'customer@example.com',
      phoneNumber: '08123456789',
      additionalParam: '',
      merchantUserInfo: '',
      customerVaName: 'Pelanggan',
      callbackUrl: `https://${req.headers.host}/api/callback`,
      returnUrl: `https://${req.headers.host}/`,
      expiryPeriod: 60,
      itemDetails: [
        {
          name: `Tagihan ${invoiceNo}`,
          price: parseInt(amount),
          quantity: 1
        }
      ],
      customerDetail: {
        firstName: 'Pelanggan',
        lastName: '',
        email: 'customer@example.com',
        phoneNumber: '08123456789'
      }
    };

    // Duitku POP Sandbox
    // Production: https://api-prod.duitku.com/api/merchant/createInvoice
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

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return res.status(500).json({ 
        success: false, 
        message: 'Response dari Duitku tidak valid',
        rawResponse: responseText 
      });
    }

    if (response.ok && data.statusCode === '00') {
      return res.status(200).json({ 
        success: true, 
        paymentUrl: data.paymentUrl,
        reference: data.reference
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: data.statusMessage || 'Gagal membuat tagihan Duitku',
        errorDetails: data 
      });
    }

  } catch (error) {
    console.error('Error creating invoice:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal Server Error'
    });
  }
}
