const multer = require('multer');

module.exports = {

    PORT: 8000,

    db_url: 'mongodb://localhost/fileSystem',

    upload: () => {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `uploads`)
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() +'-' + file.originalname)
            }
        })

        return multer({ storage: storage })
    },

}