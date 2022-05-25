import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phonenumber: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  mbti: string;

  @Column({ nullable: true })
  hobby: string;

  @CreateDateColumn({ nullable: true })
  createat: Date;

  @UpdateDateColumn({ nullable: true })
  updateat: Date;

  @DeleteDateColumn({ nullable: true })
  deleteat: Date;
}
