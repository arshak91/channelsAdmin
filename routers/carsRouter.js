import { Router } from "express";
import { getCars,addCar} from "../controllers/carController.js";
import { checkAuth } from "../middlewares/validation.js";


const carsRouter = Router();
carsRouter.get("/getCars", getCars)

carsRouter.use("/createCar", checkAuth)

carsRouter.post("/addfvte", addCar)



export { carsRouter }