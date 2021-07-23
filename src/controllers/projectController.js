const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment');
const importBoards = require('../services/importBoards');

const Project = mongoose.model('Project')

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
    const userId = req.user._id

    await importBoards(projectId, userId, (err, project) => {
        if (err) {
            res.send(err)
        }
        res.json(project)
    })
}