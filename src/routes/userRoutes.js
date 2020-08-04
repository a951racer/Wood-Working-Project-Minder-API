import { login, register } from '../controllers/userController';

module.exports = function(app) {
    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);
}
