import express from "express";
import { createBooking, getBookings, getRecentBooking } from "../controllers/bookingController.js";

const bookingRouter=express.Router();

bookingRouter.post('/create',createBooking);
bookingRouter.get('/get',getBookings);
bookingRouter.get('/getRecent',getRecentBooking);

export default bookingRouter;