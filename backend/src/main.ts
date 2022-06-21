import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userrouter";
import channelRouter from "./routers/channelRouter";
import authRouter from "./routers/auth.Router";
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
app.use("/", authRouter);
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
  password: "root",
  database: "project",
  synchronize: true,
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

  client.on(
    "getMessage",
    async (msg: string, roomId: string): Promise<void> => {
      const d = new Date();
      client.to(roomId).emit("sendMessage", {
        nickname: client.data.nickname,
        message: msg,
        date: d,
      });
      // const chat = new Chat({
      //   nickname: client.data.nickname,
      //   date: d,
      //   content: msg,
      //   channel: client.data.roomId,
      // });
      // await chat.save();
    }
  );

  client.on("enterChannel", async (roomId: string) => {
    if (client.rooms.has(roomId)) {
      return;
    }
    client.rooms.clear();
    client.data.roomId = roomId;
    client.join(roomId);
  });

  client.on("disconnect", () => {
    console.log("! disconnected ", client.id);
  });
});
/* ======================================== */

// mongoose.connect("mongodb://my_database:27017/chat_storage");
console.log("hello");

httpServer.listen(3000);
