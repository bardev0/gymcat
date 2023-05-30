import express = require("express");
import { Request, Response } from "express";
import process = require("process");
import * as dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import { transformCSV, readCSV } from "./import_csv";
dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();
const prisma = new PrismaClient();

async function addUser(userLogin: string) {
  const addUser = await prisma.uzi.create({
    data: {
      login: userLogin,
    },
  });
  console.log(addUser);
}

app.get("/test", (req: Request, res: Response) => {
  console.log(`endpoint /test reached !`);
  res.send("endpoint available");
});

app.get("/addUser", (req: Request, res: Response) => {
  addUser("greg").then(async () => {
    await prisma.$disconnect();
  });
});

app.get('/testExport', async (req: Request, res: Response) => {
	res.send('ok')
	console.log(process.cwd())
	console.log(transformCSV(readCSV("./workouts_to_enter.csv")))
})

app.listen(PORT, () => {
  console.log(`Server succesfully started on port : ${PORT} !`);
});
