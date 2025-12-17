import { Router } from "express";
import { addEvent } from "@controllers/eventsController";


const eventsRouter = Router();

 eventsRouter.post("/add-event", addEvent);


export { eventsRouter };
