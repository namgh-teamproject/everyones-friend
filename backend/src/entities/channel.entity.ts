import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  intro: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  url: string;

  @Column()
  capacity: number;

  @Column()
  hobby: string;
}
