import { Router } from 'express';
import { uploadFile } from '../controllers/users.controller.js'
import { checkAuth } from '../middlewares/validation.js'
import multer from "multer"
import fs from "fs"

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {

    fs.mkdirSync(`./uploads/${req.user.id}/images`, {
        recursive: true
    });
    fs.mkdirSync(`./uploads/${req.user.id}/others`, {
        recursive: true
    });
    // Get the type of file.
    console.log('file: ', file);
    const ext = file.mimetype.split("/")[0];
    console.log('ext: ', ext);
    if (ext === "image") {
        // if type is image then store in images folder
      cb(null, `uploads/${req.user.id}/images`);
    } else {
        // In case of not an image store in others
      cb(null, `uploads/${req.user.id}/others`);
    }
  },
  filename: (req, file, cb) => {
    // Combine the Date in milliseconds and original name and pass as filename
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});
// Use diskstorage option in multer

const upload = multer({
    storage: multerStorage,
    dest: 'uploads/',
    limits : {fileSize : 100000000}
 })

const usersRouter = Router();

usersRouter.post("/uploadsFile", checkAuth, upload.single('picture'), uploadFile)
// single
export default usersRouter;