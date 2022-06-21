import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  intro: string;

  @Column({ nullable: true })
  description: string;
}
