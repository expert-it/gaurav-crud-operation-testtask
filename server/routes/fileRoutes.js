const fileController = require('../controllers/fileController');
const fileRouter = require('express').Router();
// const auth = require('../auth/auth')
const { upload } = require('../../constant')




fileRouter.post('/fileUpload', upload().single('media') , fileController.uploadFile);
fileRouter.get('/getFiles' , fileController.getAllFiles);
fileRouter.delete('/deleteFile/:fileId' , fileController.deleteFile);
fileRouter.put('/editFile/:fileId' , upload().single('media') , fileController.editFile);


module.exports = fileRouter