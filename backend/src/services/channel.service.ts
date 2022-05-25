import { Request, Response } from "express";
import { Channel } from "../entities/channel.entity";
import { getRepository } from "typeorm";

export class Channelservice {
  constructor() {}
  static create = async (req: Request, res: Response) => {
    try {
      const channelRepository = getRepository(Channel);
      await channelRepository.save({
        ...req.body,
      });
      res.send("모임이 생성되었습니다!");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      return;
    }
  };
}
