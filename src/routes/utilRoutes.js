import { loginRequired } from '../controllers/userController'
const util = require('../controllers/utilController')

module.exports = function(app) {
    app.route('/util/dbid')
        .post(loginRequired, util.getDBId)
}

