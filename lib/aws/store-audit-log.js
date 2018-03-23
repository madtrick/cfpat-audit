const AWS = require('aws-sdk');

const AUDIT_BUCKET = process.env.AUDIT_BUCKET;

module.exports = function (data) {
  const S3Client = new AWS.S3();

  return S3Client.putObject({
    Bucket: AUDIT_BUCKET,
    Key: `cfpat-audit-result-${+ new Date()}`,
    Body: data
  }).promise();
}
