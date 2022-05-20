import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "user" })
  role: string;

  @Column("double", { nullable: true })
  latitude: number;

  @Column("double", { nullable: true })
  longitude: number;

  @Column()
  nickname: string;

  @Column()
  phonenumber: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  mbti: string;

  @Column({ nullable: true })
  hobby: string;
}
