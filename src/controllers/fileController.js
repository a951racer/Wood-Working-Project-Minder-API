//const AWS = require('aws-sdk')
//import { S3Client } from "@aws-sdk/client-s3"

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
//const importBoards = require('../services/importBoards')

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
    const { mediaType, id } = body
    const file = req.file
    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK
    let folder = ''
    let fileName = ''

    switch (mediaType) {
        case 'thumbnail':
            folder = `/${id}`
            fileName = 'Thumbnail.png'
            break
        case 'boards':
            folder = `/${id}`
            fileName = 'Boards.csv'
            break
        case 'project-media':
            folder = `/${id}/library`
            fileName = file.originalname
            break
        case 'job-media':
            folder = `/${id}/library`
            fileName = file.originalname
            break
        case 'library':
            folder = '/library'
            fileName = file.originalname
            break
    }

    let s3bucket = new S3Client.S3({
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
  
    s3bucket.upload(params, (err, data) => {
        if (err) {
            res.status(500).json({ error: true, Message: err });
        } else {
            if (mediaType === 'boards') {
                importBoards(id, req.user._id, (err, project) => {
                    if (err) {
                        return res.send(err)
                    }
                    return res.json(project)
                })
            } else {
                return res.send({ data })
            }
        }
    })
}
