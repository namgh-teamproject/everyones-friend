import express from "express";
import { AuthService } from "../services/auth.service";
const authRouter = express.Router();

authRouter.post("/login", AuthService.login);

export default authRouter;
