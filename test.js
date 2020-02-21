const QRCode = require('qrcode');
const str="Odai Atef"
QRCode.toDataURL(str, function (err, base64) {
    console.log(base64);
});





