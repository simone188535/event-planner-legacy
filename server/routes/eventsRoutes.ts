import { Router } from "express";
import { protectValidator } from "@validators/authValidators";
import {protect } from "@controllers/authController";
import { addEvent } from "@controllers/eventsController";


const eventsRouter = Router();

eventsRouter.use(protectValidator(), protect);

eventsRouter.post("/add-event", addEvent);
 //  eventsRouter.post("/add-event", addEventValidator(), addEvent);


export { eventsRouter };
