import Users from "../schemas/users.schema.js";

const uploadFile = async (req, res) => {

    console.log('file: ', req.file);
    console.log('files: ', req.files);
    const obj = {
        $push: {
            photos: null
        }
    }
    const imagesPath = [];
    const filesPath = [];
    if (req.file) {
        const ext = req.file.mimetype.split("/")[0];
        if (ext === "image") {
            obj.$push = {
                photos: req.file.path
            }
        } else {
            obj.$push = {
                files: req.file.path
            }
        }
    }
    if (req.files) {
        for (const file of req.files) {
            const ext = file.mimetype.split("/")[0];
            if (ext === "image") {
                imagesPath.push(file.path)
            } else {
                filesPath.push(file.path)
            }
        }
        obj.$push = {
            files: filesPath,
            photos: imagesPath
        }
    }
    
    const newUser = await Users.findByIdAndUpdate(req.user.id, obj, {new: true})
    // console.log('user: ', req.user);
    // console.log('req: ', req.file);
    // console.log('req: ', req.body);
    res.json({
        status: 1,
        data: newUser
    })
}

export { uploadFile }