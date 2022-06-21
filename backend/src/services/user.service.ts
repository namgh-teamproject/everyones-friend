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

    const { nickname, password, email } = req.body;
    const hash = await bcrypt.hash(password, 2);
    const newcreate = {
      nickname,
      password: hash,
      email,
    };
    await userrepository.save(newcreate);
    res.send("유저 생성 성공");
    return;
  };

  static update = async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;
    const userrepository = getRepository(User);
    const user = await userrepository.findOne({ email });
    if (!user) throw new error("회원 조회 실패");

    const hash = await bcrypt.hash(password, 2);
    console.log(hash, password);
    await userrepository.save({ id: user.id, email, password: hash, nickname });
    res.send("정보 수정 성공");
    return;
  };

  static delete = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userrepository = getRepository(User);
    const user = await userrepository.findOne({ email });
    if (!user) throw new error("이미 삭제된 회원입니다");

    await userrepository.delete({ id: user.id });
    res.send("회원탈퇴 되었습니다");
    return;
  };
}
