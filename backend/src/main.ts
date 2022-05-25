import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mysql from "mysql";
import userRouter from "./routers/userrouter";
import { ConnectionOptions, createConnection } from "typeorm";
import channelRouter from "./routers/channelRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/channel", channelRouter);
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

const Mysqlconfig: ConnectionOptions = {
  type: "mysql",
  host: "34.64.250.197",
  port: 3306,
  username: "project",
  password: "root",
  database: "project",
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.ts"],
};

// const dbCreateConnection = async () => {
//   await createConnection(Mysqlconfig);
// };

(async () => {
  await createConnection(Mysqlconfig);
})();

// mongoose.connect("mongodb://my_database:27017/project");
console.log("hello");

app.listen(3000);
