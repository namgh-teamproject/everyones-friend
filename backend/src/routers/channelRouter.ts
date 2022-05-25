import express from "express";
import { Channelservice } from "../services/channel.service";

const channelRouter = express.Router();

channelRouter.post("/create", Channelservice.create);

export default channelRouter;
