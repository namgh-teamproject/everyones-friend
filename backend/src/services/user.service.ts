import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { getRepository } from "typeorm";

export class Userservice {
  constructor() {}
  static create = async (req: Request, res: Response) => {
    const userrepository = getRepository(User);
    const { id, nickname, phonenumber } = req.body;
    const newcreate = {
      nickname,
      phonenumber,
    };
    await userrepository.save(newcreate);
    res.send(newcreate);
    return;
  };
}
