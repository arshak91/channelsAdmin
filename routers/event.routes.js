import { Router } from "express";
import { getEvents, createEvents, getEventByUser } from "../controllers/events.controller.js";
import { checkAuth } from "../middlewares/validation.js";
const EventRoutes = Router();

EventRoutes.get("/", checkAuth)


EventRoutes.get("", getEvents)
EventRoutes.post("", createEvents)

EventRoutes.get("/userEvents", getEventByUser)

export { EventRoutes }