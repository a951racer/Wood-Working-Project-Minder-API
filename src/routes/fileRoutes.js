import multer from 'multer';
import { loginRequired } from '../controllers/userController';
//const files = require('../controllers/fileController');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function(app) {
/*    app.route('/file')
        //.get(loginRequired, files.getFiles)
        .post(loginRequired, upload.single('file'), files.addNewFile);

    app.route('/file/:fileName')
        //.get(loginRequired, files.getFileWithID)
        //.delete(loginRequired, files.deleteFile);
*/
}

