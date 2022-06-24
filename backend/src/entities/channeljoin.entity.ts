import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel.entity";

@Entity()
export class ChannelJoin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @ManyToOne(() => Channel, { eager: true })
  channel: Channel;
}
