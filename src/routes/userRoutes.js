import { login, register, fetch, update } from '../controllers/userController';

module.exports = function(app) {
    app.route('/auth/register')
        .post(register)

    app.route('/auth/login')
        .post(login)

    app.route('/user/:userId')
        .get(fetch)
        .put(update)
}
