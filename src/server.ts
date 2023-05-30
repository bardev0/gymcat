import express = require("express");
import { Request, Response } from "express";
import process = require("process");
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SERVER_PORT;
const app = express();

app.get("/test", (req: Request, res: Response) => {
  console.log(`endpoint /test reached !`);
  res.send("endpoint available");
});

app.listen(PORT, () => {
  console.log(`Server succesfully started on port : ${PORT} !`);
});
