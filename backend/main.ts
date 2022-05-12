import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

const connection = mysql.createConnection({
  host: "34.64.250.197",
  port: 3306,
  user: "project",
  password: "",
  database: "project",
});

mongoose.connect("mongodb://my_database:27017/project");
connection.connect();
app.listen(3000);
