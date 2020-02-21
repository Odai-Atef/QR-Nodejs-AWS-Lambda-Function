
const AWS = require('aws-sdk');
const QRCode = require('qrcode');
const S3_BUCKET="qrimagesgenerated";
const s3bucket = new AWS.S3({params: {Bucket: S3_BUCKET}});
const s3 = new AWS.S3();

exports.handler = async (event) => {
     QRCode.toDataURL(event.str, function (err,base64) {
	  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
	  const type = base64.split(';')[0].split('/')[1];
	  const image_name=Date.now()+"-"+Math.floor(Math.random() * 1000);   
	  const params = {
		    Bucket: S3_BUCKET,
		    Key: `${image_name}.${type}`, // type is not required
		    Body: base64Data,
		    ACL: 'public-read',
		    ContentEncoding: 'base64', // required
		    ContentType: `image/${type}` // required. Notice the back ticks
		  }
	  s3bucket.upload(params, function (err, data) {

                        if (err) {
                            console.log('ERROR MSG: ', err);
                        } else {
                            console.log('Successfully uploaded data');
                        }
                    });
    });
   
    
};





