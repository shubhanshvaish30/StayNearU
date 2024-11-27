import express from "express";
import { addPG, getAdminPG, getAllPG } from "../controllers/pgController.js";

const pgAdminRouter=express.Router();

pgAdminRouter.post('/addPg',addPG);
pgAdminRouter.get('/getAllPG',getAllPG);
pgAdminRouter.get('/getAdminPG/:id',getAdminPG);

export default pgAdminRouter;