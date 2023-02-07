const Constant = require('../../constant');
const fileModel = require('../models/fileModel');



module.exports = {
    uploadFile: async (req, res) => {
        const file = req.file

        if (!file) {
            return res.status(400).json({ status: false, message: 'Please select file' })
        }

        const File = new fileModel({

            file: file.filename,
            path: file.path,
            isEdited: false
        })
        File.save()
            .then(async ({ file, path }) => {

                return res.status(200).json({ status: true, message: "file uploaded successfully", path, file })
            })
            .catch((err) => {
                return res.status(400).json({ status: false, message: err.message })
            })
    },

    getAllFiles: async (req, res) => {
        fileModel.find({}).sort({ _id : -1 })
            .then((files) => {

                return res.status(200).json({ status: true, message: "Files fetched successfully", files })
            })
            .catch((err) => {
                return res.status(400).json({ status: false, message: err.message })
            })
    },

    deleteFile: async (req, res) => {
        const { fileId } = req.params

        if (!fileId) {
            return res.status(400).json({ status: false, message: "enter file id" })
        }

        fileModel.findByIdAndDelete({ _id: fileId }).then((files) => {
            return res.status(200).json({ status: true, message: "Files deleted successfully", files })
        }).catch((err) => {
            return res.status(400).json({ status: false, message: err.message })
        })
    },

    editFile: async (req, res) => {
        const { fileId } = req.params

        const  file  = req.file

        console.log('foieee-->>>',file)

        if (!fileId) {
            return res.status(400).json({ status: false, message: "enter file id" })
        }

        if (!file) {
            return res.status(400).json({ status: false, message: 'Please select file' })
        }

        const File = {

            file: file.filename,
            path: file.path,
            isEdited: true
        }

        fileModel.findByIdAndUpdate({ _id: fileId }, File , { new : true }).then((files) => {
            return res.status(200).json({ status: true, message: "Files updated successfully", files })
        }).catch((err) => {
            return res.status(400).json({ status: false, message: err.message })
        })
    }
} 