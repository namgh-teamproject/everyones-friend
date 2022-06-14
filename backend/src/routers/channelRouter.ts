import express from "express";
import { ChannelService } from "../services/channel.service";

const channelRouter = express.Router();

channelRouter.post("/create", ChannelService.create);

export default channelRouter;
