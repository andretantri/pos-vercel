import { createHash } from 'crypto';

export default async function handler(req, res) {
  // CORS headers
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

    // Duitku POP Signature: SHA256(merchantCode + timestamp + apiKey)
    const timestamp = Math.round(Date.now()).toString();
    const signature = createHash('sha256')
      .update(merchantCode + timestamp + apiKey)
      .digest('hex');

    const paymentAmount = parseInt(amount);

    // Payload sesuai dokumentasi resmi Duitku POP
    // https://docs.duitku.com/pop/id/#create-invoice
    const payload = {
      paymentAmount: paymentAmount,
      merchantOrderId: invoiceNo,
      productDetails: `Pembayaran Invoice ${invoiceNo}`,
      additionalParam: '',
      merchantUserInfo: '',
      customerVaName: 'Pelanggan',
      email: 'customer@email.com',
      phoneNumber: '08123456789',
      itemDetails: [
        {
          name: `Tagihan ${invoiceNo}`,
          price: paymentAmount,
          quantity: 1
        }
      ],
      customerDetail: {
        firstName: 'Pelanggan',
        lastName: '',
        email: 'customer@email.com',
        phoneNumber: '08123456789',
        billingAddress: {
          firstName: 'Pelanggan',
          lastName: '',
          address: 'Indonesia',
          city: 'Jakarta',
          postalCode: '10000',
          phone: '08123456789',
          countryCode: 'ID'
        },
        shippingAddress: {
          firstName: 'Pelanggan',
          lastName: '',
          address: 'Indonesia',
          city: 'Jakarta',
          postalCode: '10000',
          phone: '08123456789',
          countryCode: 'ID'
        }
      },
      callbackUrl: `https://${req.headers.host}/api/callback`,
      returnUrl: `https://${req.headers.host}/`,
      expiryPeriod: 60
    };

    // Sandbox URL (huruf kecil sesuai contoh PHP di dokumentasi)
    // Production: https://api-prod.duitku.com/api/merchant/createinvoice
    const duitkuUrl = 'https://api-sandbox.duitku.com/api/merchant/createinvoice';

    const bodyString = JSON.stringify(payload);

    const response = await fetch(duitkuUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyString).toString(),
        'x-duitku-signature': signature,
        'x-duitku-timestamp': timestamp,
        'x-duitku-merchantcode': merchantCode
      },
      body: bodyString
    });

    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: 'Response dari Duitku tidak valid',
        httpStatus: response.status,
        rawResponse: responseText.substring(0, 500)
      });
    }

    if (response.status === 200 && data.statusCode === '00') {
      return res.status(200).json({
        success: true,
        paymentUrl: data.paymentUrl,
        reference: data.reference,
        statusMessage: data.statusMessage
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
