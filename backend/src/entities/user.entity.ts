import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "user" })
  role: string;

  @Column("double")
  latitude: number;

  @Column("double")
  longitude: number;

  @Column()
  nickname: string;

  @Column()
  phonenumber: string;

  @Column()
  password: string;

  @Column()
  mbti: string;

  @Column()
  hobby: string;
}
