import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userrouter";
import channelRouter from "./routers/channelRouter";
import { ConnectionOptions, createConnection } from "typeorm";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Chat } from "./models/chat.model";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const swaggerSpec = YAML.load("./src/swagger/build.yaml");
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/channel", channelRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const Mysqlconfig: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "3160",
  database: "project",
  synchronize: false,
  logging: true,
  entities: ["src/entities/*.ts"],
};

(async () => {
  await createConnection(Mysqlconfig);
})();

/* =================socket================= */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (client: Socket) => {
  console.log("connected ", client.id);
  client.leave(client.id);
  client.data.roomId = `room:lobby`;
  client.join("room:lobby");

  client.on(`getmessage`, async (msg: string) => {
    io.emit(`sendmessage`, msg);
    // const chat = new Chat({
    //   nickname: client.data.nickname,
    //   date: new Date(),
    //   content: msg,
    //   roomId: client.data.roomId,
    // });
    // await chat.save();
    console.log(msg);
  });

  client.on("disconnect", () => {
    console.log("! disconnected ", client.id);
  });
});
/* ======================================== */

// mongoose.connect("mongodb://my_database:27017/project");
console.log("hello");

httpServer.listen(3000);
