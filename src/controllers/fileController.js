const AWS = require('aws-sdk')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const Project = mongoose.model('Project')

/*
exports.getFiles = (req, res) => {
    const today = moment().utcOffset('America/Chicago').startOf('day').toDate();
    Project.find()
        .sort({name: 1})
        .exec((err, projects) => {
        if (err) {
            res.send(err);
        }
        res.json(projects);
    });
};

exports.getProjectWithID = (req, res) => {
    Project.findById(req.params.projectId)
        .exec(function(err, project) {
        if (err) {
            res.send(err);
        }
        res.json(project);
    })
}
*/

exports.addNewFile = (req, res) => {
    const { body } = req
    const { mediaType, projectId } = body
    const file = req.file
    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK
    let folder = ''

    const fileName = projectId + '.' + file.mimetype.split('/')[1]

    switch (mediaType) {
        case 'thumbnail':
            folder = '/images'
    }

    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    })

    var params = {
      Bucket: process.env.AWS_BUCKET_NAME + folder,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    }
  
    s3bucket.upload(params, function(err, data) {
        if (err) {
            res.status(500).json({ error: true, Message: err });
        } else {
            res.send({ data })
            var newFileUploaded = {
                description: req.body.description,
                fileLink: s3FileURL + file.originalname,
                s3_key: params.Key
            };
        }
    })
}

/*
exports.updateProject = (req, res) => {
    let project = req.body
    Project.findOneAndUpdate({ _id: req.params.projectId}, project, { new: true }, (err, project) => {
        if (err) {
            res.send(err);
        }
        res.json(project);
    })
}

exports.deleteProject = (req, res) => {
    Project.remove({ _id: req.params.projectId }, (err, project) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Project'});
    })
}
*/