import { genSalt, hashSync, compareSync } from "bcrypt";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Users from "../schemas/users.schema.js";
const jwtKey = "admin"
import mailer from "../helpers/mailer.js"


const createUser = async (req, res) => {
    const saltRounds = 10;
    const {firstName, lastName, username, email, password, age} = req.body;

    console.log(req.headers);
    // const salt = await genSalt(saltRounds);
    const url = `http://${req.headers.host}/checkEmail/`
    // const hashPassword = hashSync(`${password}`, salt);
    const sendMail = await mailer(url, email)

    // console.log('sendMail: ', sendMail);
    // const user = await Users.create({
    //     name: firstName,
    //     surname: lastName,
    //     username,
    //     email,
    //     age,
    //     oneTimePass: sendMail,
    //     password: hashPassword
    // });
    console.log(req.body);
    res.json({
        status: 1,
        // data: user
    })
}
const login = async ( req, res) => {

    const { login, password } = req.body;
    console.log(login, password );

    const user = await Users.findOne({
        email: login
    });

    const passwordTrue = compareSync(password, user.password)
    if (!passwordTrue) {
        return res.json({
            status: 0,
            message: "wrong password!!"
        })
    }
    // console.log(user);


    const token = jwt.sign({
        id: user.id,
        username: user.username,
        name: user.name
    }, jwtKey, {
        expiresIn: "1h"
    });

    res.json({
        status: 1,
        token
    })
}

const getUsers = async (req, res) => {
    console.log(req.params.id);
    const fUser = await Users.findById(req.params.id);
    const sUser = await Users.findOne({
        _id: req.params.id
    });

    const putUser = await Users.findByIdAndUpdate(req.params.id, {
        age: 32
    }, {
        new: true
    });
    console.log('putUser: ', putUser);
    // await Users.findByIdAndDelete()


    // await Users.findOneAndUpdate()
    // await Users.findOneAndDelete()


    console.log("fuser: ", fUser);
    console.log("suser: ", sUser);

    res.json({
        status: 1,
        data: {
            // fUser,
            // sUser,
            putUser
        }
    })
}

const changeUser = async (req, res) => {
    const { age } = req.body;
    const putUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    console.log('putUser: ', putUser);
    res.json({
        status: 1,
        data: putUser
    })
}

const mailerRespose = async (req, res) => {
    console.log(req.params);
    const user = await Users.findOneAndUpdate({
        oneTimePass: req.params.oneTimePass
    }, {
        status: 1,
        oneTimePass: null
    }, {
        new: true
    })
    res.json({
        status: 1,
        data: user
    })
}

const forgotPass = async (req, res) => {
    const url = `http://${req.headers.host}/forgotPass/`
    const user = await Users.findOne({
        $or: [
            {email: req.body.login},
            {username: req.body.login},
        ]
    })
    if (!user) {
        res.json({
            status: 0,
            message: "Error"
        })
        return
    }
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        name: user.name
    }, jwtKey, {
        expiresIn: "1h"
    });
    // const hashPassword = hashSync(`${password}`, salt);
    const sendMail = await mailer(url, user.email, token)
    const uptUser = await Users.findOneAndUpdate({email: user.email},{
        oneTimePass: sendMail,
        status: 2
    }, {
        new: true
    })
    res.json({
        status: 1,
        data: uptUser
    })
}

const authForForgotPass = async (req, res) => {
    console.log(req.params.oneTimePass);
    const user = await Users.findOne({
        oneTimePass: req.params.oneTimePass
    })
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        name: user.name
    }, jwtKey, {
        expiresIn: "1h"
    });
    res.json({
        status: 1,
        token
    })
}

export {
    createUser,
    login,
    getUsers,
    changeUser,
    mailerRespose,
    forgotPass,
    authForForgotPass
}