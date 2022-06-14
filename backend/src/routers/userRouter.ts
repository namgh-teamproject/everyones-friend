import express from "express";
import { UserService } from "../services/user.service";

const userRouter = express.Router();

userRouter.post("/create", UserService.create);

userRouter.put("/update", UserService.update);

userRouter.delete("/delete", UserService.delete);

export default userRouter;
