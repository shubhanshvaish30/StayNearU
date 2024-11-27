import express from "express";
import { getPG, getSearchRes } from "../controllers/pgController.js";
import { postReview } from "../controllers/reviewController.js";

const pgUserRouter=express.Router();

pgUserRouter.get('/search',getSearchRes);
pgUserRouter.get('/getPG/:id',getPG);
pgUserRouter.post('/getPG/:id/review',postReview);

export default pgUserRouter;