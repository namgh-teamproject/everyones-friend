import express from "express";
import { Userservice } from "../services/user.service";

const userRouter = express.Router();

userRouter.post("/create", Userservice.create);

userRouter.put("/update", Userservice.update);

userRouter.delete("/delete", Userservice.delete);

export default userRouter;
