import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
