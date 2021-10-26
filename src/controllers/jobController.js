const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const Job = mongoose.model('Job')

exports.getJobs = (req, res) => {
    const today = moment().utcOffset('America/Chicago').startOf('day').toDate();
    Job.find()
        .sort({name: 1})
        .exec((err, jobs) => {
        if (err) {
            res.send(err);
        }
        res.json(jobs);
    });
};

exports.getJobWithID = (req, res) => {
    Job.findById(req.params.jobId)
        .exec(function(err, job) {
        if (err) {
            res.send(err);
        }
        res.json(job);
    });
}

exports.addNewJob = (req, res) => {
    Job.create(req.body, (err, job) => {
        if (err) {
            res.send(err);
        }
        res.json(job);
    });
};

exports.updateJob = (req, res) => {
    let job = req.body
    Job.findOneAndUpdate({ _id: req.params.jobId}, job, { new: true }, (err, job) => {
        if (err) {
            res.send(err);
        }
        res.json(job);
    })
}

exports.deleteJob = (req, res) => {
    Job.remove({ _id: req.params.jobId }, (err, job) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Job'});
    })
}