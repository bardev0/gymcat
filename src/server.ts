import express = require("express");
import { Request, Response } from "express";
import process = require("process");
import * as dotenv from "dotenv";
import { transformCSV, readCSV } from "./import_csv";
import { MongoClient } from "mongodb";
import cors = require("cors");
import bcrypt from "bcrypt";
const uri =
  "mongodb+srv://greg1111:Rgbi5QPJQCck3eox@cluster0.nsckr5l.mongodb.net/Cluester0";
const client = new MongoClient(uri);

dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();
app.use(cors<Request>());
app.use(express.json());

let legacyUsername: string = 'greg'
let legacyWorkouts = transformCSV(legacyUsername, readCSV("./workouts_to_enter.csv"));

// add username for furure usage
async function queryAllUserWorkouts() {
		try {
    const database = client.db("Cluester0");
    const workouts = database.collection("Workouts2");
		const query = { totalDay: { $gt: 2000 }}
		const result = await workouts.find(query).toArray()
		
		console.log(result)
		}
		finally {
		}
}

async function addLegacyWorkouts(multipleWorkouts: any) {
  try {
    const database = client.db("Cluester0");
    const workouts = database.collection("Workouts2");
    const options = { ordered: true }; // this option prevents additional documents from being inserted if one fails

    const query = multipleWorkouts;

    const result = await workouts.insertMany(multipleWorkouts, options);
    console.log(result);
  } finally {
    await client.close();
  }
}

async function addUser(userName: string, userPassw: string) {
  try {
    const database = client.db("Cluester0");
    const users = database.collection("Users");
    const user1 = { name: userName, pass: userPassw };

    const result = await users.insertOne(user1);
    console.log(result);
  } finally {
    console.log("ok");
  }
}

app.post("/addUser", (req: Request, res: Response) => {
  // place to use Interfac
  // workout different time parsings
  try {
    addUser(req.body.name, req.body.password);
  } finally {
    res.send("user added");
    console.log(req.body.name + " " + req.body.password);
  }
});

app.post("/login", async (req, res) => {
  try {
    let username = req.body.name;
    let pass = req.body.pass;
    console.log(username + " " + pass);
    const database = client.db("Cluester0");
    const users = database.collection("Users");

    const ifUserExists = await users.findOne({ name: username }).then((obj) => {
      console.log(obj);
      if (obj == null) {
        res.send({ loginStatus: "no user" });
      } else {
        bcrypt.compare(username, obj?.pass, (err, result) => {
          console.log(result);
          if (result) {
						// do a mongoquery to return all workouts with username as name
            res.send({ loginStatus: "logged in",  });
          } else {
            res.send({ loginStatus: "wrong password" });
          }
        });
      }
    });
  } finally {
  }
});

app.get("/test", (req: Request, res: Response) => {
  console.log(`endpoint /test reached !`);
  res.send("endpoint available");
});

// have to add username for each workout
app.get("/addLegacyWorkouts", (req: Request, res: Response) => {
  try {
    addLegacyWorkouts(legacyWorkouts);
  } finally {
    res.send("ok");
    console.log("ok");
  }
});

app.get("/findWorkouts", (req: Request, res: Response) => {
	queryAllUserWorkouts()
	res.send('ok')
})

app.get("/testExport", async (req: Request, res: Response) => {
  console.log(transformCSV(legacyUsername, readCSV("./workouts_to_enter.csv")));
  res.send(transformCSV(legacyUsername, readCSV("./workouts_to_enter.csv")));
});

app.listen(PORT, () => {
  console.log(`Server succesfully started on port : ${PORT} !`);
});

// export types to separate file and add them to this
// add error when username exist when creating a new user
//

// hash from loginBox and Register are different
