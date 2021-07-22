import { loginRequired } from '../controllers/userController'
const projects = require('../controllers/projectController')

module.exports = function(app) {
    app.route('/project')
        .get(loginRequired, projects.getProjects)
        .post(loginRequired, projects.addNewProject);

    app.route('/project/:projectId')
        .get(loginRequired, projects.getProjectWithID)
        .put(loginRequired, projects.updateProject)
        .delete(loginRequired, projects.deleteProject)

    app.route('/project/import-boards/:projectId/:userId')
        .post(loginRequired, projects.importBoards)

}

