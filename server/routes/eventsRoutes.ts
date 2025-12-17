import { Router } from "express";
import { protectValidator } from "@validators/authValidators";
import { addEvent } from "@controllers/eventsController";


const eventsRouter = Router();

 eventsRouter.post("/add-event", protectValidator(), addEvent);
 //  eventsRouter.post("/add-event", addEventValidator(), addEvent);


export { eventsRouter };
