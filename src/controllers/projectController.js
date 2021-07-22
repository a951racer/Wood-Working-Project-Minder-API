const AWS = require('aws-sdk')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const parse = require('csv-parse')

const Project = mongoose.model('Project')
const User = mongoose.model('User')

exports.getProjects = (req, res) => {
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
    });
}

exports.addNewProject = (req, res) => {
    Project.create(req.body, (err, project) => {
        if (err) {
            res.send(err);
        }
        res.json(project);
    });
};

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

exports.importBoards = async (req, res) => {
    const projectId = req.params.projectId
    const userId = req.params.userId

    const project = await Project.findById(projectId)
    const profile = await User.findById(userId)

    let boards = []
    let newBoard = {}
    const parser = parse()

    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK
    let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    })
    
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME + `/${projectId}`,
        Key: 'Boards.csv',
    }
    
    const s3Stream = s3bucket.getObject(params).createReadStream()
    s3Stream.pipe(parser)
        .on('data', (data) => {
            if (data[0] !== 'Label') {
                newBoard = {
                    'label': data[0],
                    'name': data[1],
                    'material': data[2],
                    'finalWidth': data[3],
                    'finalLength': data[4],
                    'finalThickness': data[5],
                    'roughWidth': parseFloat(data[3]) + parseFloat(profile.roughWidth),
                    'roughLength': parseFloat(data[4]) + parseFloat(profile.roughLength),
                }
                boards.push(newBoard)
                newBoard = {}
            }
        })
        .on("end", function () {
            project.boards = boards
            Project.findOneAndUpdate({ _id: projectId}, project, { new: true }, (err, project) => {
                if (err) {
                    res.send(err)
                }
            })
        
            res.json(project)
        })
}