import express, { json } from "express";
import bodyParser from "body-parser";;
import { EventRoutes } from "./routers/event.routes.js";
import { authRoutes } from "./routers/auth.router.js";
import { carsRouter } from "./routers/carsRouter.js";
import usersRouter from './routers/users.router.js'
import dbConnect from  "./db.connect/dbConnect.js";
import dotenv from "dotenv";
import { checkAuth } from "./middlewares/validation.js";
import path from "path";

dotenv.config()

const app = express();
dbConnect()
// console.log(import.meta.url);
// console.log('__dirname: : ', dirname(import.meta.url));
console.log(path.resolve());
const filePath =  path.resolve() + '/uploads';
console.log(filePath);


app.use('/uploads', express.static(filePath))
app.use(bodyParser.json());
app.use(json());
// app.use(express.urlencoded({ extended: true }));



app.use("/", authRoutes)
app.use("/events", EventRoutes)
app.use("/", carsRouter)
app.use('/user', usersRouter)

app.listen(8000)
console.log("PORT ", 8000);