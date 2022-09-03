const express = require('express');
const existFile = require('../middleware/existFile');
const fileUploadRouter = express.Router();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const streamifier = require('streamifier');



fileUploadRouter.post('/', [existFile], (req, res) => {
    try {
        const file = req.files.image;

        const uploadStream = cloudinary.uploader.upload_stream({ folder: "file_upload_app" }, (error, result) => {
            console.log(error, result);
            res.status(200).json({
                msg: 'ok!',
                url: result.secure_url
            })
        });


        streamifier.createReadStream(file.data).pipe(uploadStream);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'server error :p'
        })
    }

});


module.exports = fileUploadRouter;