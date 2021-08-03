import { loginRequired } from '../controllers/userController'
const library = require('../controllers/libraryController')

module.exports = function(app) {
    app.route('/library')
        .get(loginRequired, library.getItem)
        .post(loginRequired, library.addNewItem);

    app.route('/library/:itemId')
        .get(loginRequired, library.getItemWithID)
        .put(loginRequired, library.updateItem)
        .delete(loginRequired, library.deleteItem)
}

