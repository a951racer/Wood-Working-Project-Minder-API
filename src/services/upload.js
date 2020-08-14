  
const {NotFoundError} = require('../../errors')
const {validate} = require('../validation')
const mongo = require('../mongo')
// const contextLoader = require('../context-loader')
const limitBytesTransform = require('../limit-bytes-transform')
const S3Client = require('../s3')
const path = require('path')

module.exports = {
  uploadDocument,
}
async function uploadDocument({shipmentId, source, size, contentType, documentType, originalFilename}, context) {
  let {errors, value} = await validate('quote-upload-document', {shipmentId, ...context})
  if (errors && errors._id) throw new NotFoundError(`Shipment not found ${shipmentId}`)
  let {userId} = value
  shipmentId = value.shipmentId
  let storageKey = path.join(process.env.AWS_PATH, `${shipmentId}.pdf`)

  let client = new S3Client({bucket: process.env.AWS_BUCKET})
  let readable = source.pipe(limitBytesTransform(+process.env.UPLOAD_LIMIT_BYTES)) // cap the upload size
  let result = {success: false}
  try {
    let uploadResult = await client.upload(storageKey, readable, {ContentType: contentType, ContentLength: size, ACL: 'public-read'})

    // result.Location
    // result.ETag
    let $update = {
      $push: {
        files: {
          type: documentType,
          subtype: 'carrier',
          url: uploadResult.Location,
          uploadedBy: userId,
          originalFilename: originalFilename,
          contentType,
        },
      },
      $set: {
        'dispatches.0.bolURL': uploadResult.Location,
        'dispatches.0.status': 'ok',
      },
    }
    await mongo.shipments.updateOne({_id: shipmentId}, $update)
    result.success = true
    result.url = uploadResult.Location
  } catch (err) {
    console.error(err)
    result.message = err.message
  }
  return result
}