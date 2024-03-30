import multer from "multer"

const upload = multer({
    dest: 'uploads/',
    limits : {fileSize : 4500}
})

const checkFileSize = async (req, res, next) => {
    upload.single('picture')(req, res, (err) => {
        console.log(req.file);
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }
    });
    next()
}

export {
    checkFileSize
}