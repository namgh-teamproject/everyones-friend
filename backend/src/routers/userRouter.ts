import express from "express";
import { Userservice } from "../services/user.service";

const userRouter = express.Router();

userRouter.post("/create", Userservice.create);

export default userRouter;
