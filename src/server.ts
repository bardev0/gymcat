import express = require("express");
import { Request, Response } from "express";
import process = require("process");
import * as dotenv from "dotenv";
import { transformCSV, readCSV } from "./import_csv";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://greg1111:Rgbi5QPJQCck3eox@cluster0.nsckr5l.mongodb.net/Cluester0";
const client = new MongoClient(uri);

dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();

let legacyWorkouts = transformCSV(readCSV("./workouts_to_enter.csv"));

async function addLegacyWorkouts(multipleWorkouts: any) {
  try {
    const database = client.db("Cluester0");
    const users = database.collection("Workouts2");
    const options = { ordered: true }; // this option prevents additional documents from being inserted if one fails

    const query = multipleWorkouts;

    const result = await users.insertMany(multipleWorkouts, options);
    console.log(result);
  } finally {
    await client.close();
  }
}

app.get("/test", (req: Request, res: Response) => {
  console.log(`endpoint /test reached !`);
  res.send("endpoint available");
});

app.get("/addLegacyWorkouts", (req: Request, res: Response) => {
  try {
    addLegacyWorkouts(legacyWorkouts);
  } finally {
    res.send("ok");
    console.log("ok");
  }
});

app.get("/testExport", async (req: Request, res: Response) => {
  console.log(transformCSV(readCSV("./workouts_to_enter.csv")));
  res.send(transformCSV(readCSV("./workouts_to_enter.csv")));
});

app.listen(PORT, () => {
  console.log(`Server succesfully started on port : ${PORT} !`);
});

// export types to separate file and add them to this
