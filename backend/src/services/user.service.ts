import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { getRepository } from "typeorm";
import { error } from "console";
import * as bcrypt from "bcrypt";

export class UserService {
  constructor() {}
  static create = async (req: Request, res: Response) => {
    const userrepository = getRepository(User);
    const check = await userrepository.findOne({ email: req.body.email });

    console.log(check);
    if (check) throw new error("등록된 이메일입니다");

    const {
      id,
      nickname,
      phonenumber,
      password,
      email,
      mbti,
      hobby,
      latitude,
      longitude,
    } = req.body;
    const hash = await bcrypt.hash(password, 2);
    const newcreate = {
      nickname,
      phonenumber,
      password: hash,
      email,
      mbti,
      hobby,
      latitude,
      longitude,
    };
    await userrepository.save(newcreate);
    res.send(newcreate);
    return;
  };

  static update = async (req: Request, res: Response) => {
    const { email, password, ...rest } = req.body;
    const userrepository = getRepository(User);
    const user = await userrepository.findOne({ email });
    if (!user) throw new error("회원가입 해주세요");

    const hash = await bcrypt.hash(password, 2);
    console.log(hash, password);
    await userrepository.save({ id: user.id, password: hash, ...rest });
    res.send(req.body);
    return;
  };

  static delete = async (req: Request, res: Response) => {
    const { email, ...rest } = req.body;
    const userrepository = getRepository(User);
    const user = await userrepository.findOne({ email });
    if (!user) throw new error("이미 삭제된 회원입니다");

    await userrepository.softDelete({ id: user.id });
    console.log("hihihihihi");
    res.send("회원탈퇴 되었습니다");
    return;
  };
}
