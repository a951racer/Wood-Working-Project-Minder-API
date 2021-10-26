import { loginRequired } from '../controllers/userController'
const job = require('../controllers/jobController')

module.exports = function(app) {
    app.route('/job')
        .get(loginRequired, job.getJobs)
        .post(loginRequired, job.addNewJob)

    app.route('/job/:jobId')
        .get(loginRequired, job.getJobWithID)
        .put(loginRequired, job.updateJob)
        .delete(loginRequired, job.deleteJob)
}

