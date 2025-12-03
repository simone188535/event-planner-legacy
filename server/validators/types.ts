import { RequestHandler } from "express";
import { body, ValidationChain } from "express-validator";

export type ValidatorWithCheck = [...ValidationChain[], RequestHandler];