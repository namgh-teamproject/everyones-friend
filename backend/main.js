import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mysql from "mysql";
import userRouter from "./routers/userrouter";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/user", userRouter);
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

const connection = mysql.createConnection({
  host: "34.64.250.197",
  user: "project",
  password: "root",
  database: "project",
});

mongoose.connect("mongodb://my_database:27017/project");
connection.connect();
app.listen(3000);
