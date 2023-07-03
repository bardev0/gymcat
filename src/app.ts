import express = require("express");
import { Request, Response } from "express";
import { transformCSV, readCSV } from "./import_csv";
import { MongoClient } from "mongodb";
import cors = require("cors");
import bcrypt from "bcrypt";
import logic from "./logic";
// move all non-path functions to separe file

const uri =
    "mongodb+srv://greg1111:Rgbi5QPJQCck3eox@cluster0.nsckr5l.mongodb.net/Cluester0";
const client = new MongoClient(uri);

const app = express();
app.use(cors<Request>());
app.use(express.json());

let legacyUsername: string = "greg";
let legacyWorkouts = transformCSV(
    legacyUsername,
    readCSV("./workouts_to_enter.csv")
);

const routes = [
    "/addWorkout",
    "/addUser",
    "/validateUser",
    "/retriveUserWorkouts",
];
async function validateUser(username: string) {
    const re = new RegExp(`${username}`);
    console.log(re);
    const database = client.db("Cluester0");
    const workouts = database.collection("Users");
    const query = { name: { $regex: re } };
    const result = await workouts.find(query).toArray();
    return result;
}

async function addLegacyWorkouts(multipleWorkouts: any) {
    try {
        const database = client.db("Cluester0");
        const workouts = database.collection("Workouts");
        const options = { ordered: true }; // this option prevents additional documents from being inserted if one fails

        const query = multipleWorkouts;

        const result = await workouts.insertMany(multipleWorkouts, options);
        console.log(result);
    } finally {
        await client.close();
    }
}

async function addUser(userName: string, userPassw: string, userEmail: string) {
    try {
        const database = client.db("Cluester0");
        const users = database.collection("Users");
        const user1 = { name: userName, pass: userPassw, email: userEmail };

        const result = await users.insertOne(user1);
        console.log(result);
    } finally {
        console.log("ok");
    }
}

// todo : specify correct collection
async function grabUserWorkouts(user: string) {
    const re = new RegExp(`${user}`);
    const database = client.db("Cluester0");
    const workouts = database.collection("Workouts");
    const query = { workoutOwner: { $regex: re } };

    const result = await workouts.find(query).toArray();
    console.log(result);
    return await result;
}

app.post(routes[3], async (req: Request, res: Response) => {
    console.log(req.body.user);
    const allUserWorkouts = await grabUserWorkouts(req.body.user);
    res.send(allUserWorkouts);
});


app.post(routes[0], (req: Request, res: Response) => {
    try {
        // console.log(req.body);
				console.log(req.body)
        logic.addWorkout(
					req.body
                  );
    } finally {
        res.json({ status: "workout added" });
    }
});

app.post(routes[2], async (req: Request, res: Response) => {
    validateUser(req.body.user).then((r) => {
        if (r.length == 0) {
            res.json({ doesUserExist: false });
        } else {
            res.json({ doesUserExist: true });
        }
    });
});

app.post(routes[1], (req: Request, res: Response) => {
    // place to use Interfac
    // workout different time parsings

    // check if user exists
    try {
        addUser(req.body.name, req.body.password, req.body.email);
    } finally {
        res.send("user added");
        console.log(req.body.name + " " + req.body.password);
    }
});

app.post("/addTemplateExercise", (req, res) => {
    console.log("endpoint temp exerc reached");
    try {
        let exerc1 = {
            muscleG: req.body.mg,
            exerc: req.body.e,
        };
        console.log(exerc1);
        logic.addTemplateExercise(exerc1);
    } finally {
        res.send("endpoint temp exerc reached");
    }
});

app.post("/exportExercices", async (req, res) => {
    try {
        // retrive all exercices from db
        console.log(await logic.grabExercic());
    } finally {
        res.send(await logic.grabExercic());
    }
});

app.post("/addSpcificUserTemplateExercise", (req, res) => {
    console.log("endpoint temp exerc reached");
    try {
        let exerc2 = {
            user: req.body.user,
            muscleG: req.body.mg,
            exerc: req.body.e,
        };

        logic.addUserExercisce(exerc2);
    } finally {
        res.send("endpoint temp exerc reached");
    }
});

app.post("/login", async (req, res) => {
    try {
        let username = req.body.name;
        let pass = req.body.pass;
        console.log(username + " " + pass);
        const database = client.db("Cluester0");
        const users = database.collection("Users");

        const ifUserExists = await users
            .findOne({ name: username })
            .then((obj) => {
                console.log(obj);
                if (obj == null) {
                    res.send({ loginStatus: "no user" });
                } else {
                    bcrypt.compare(pass, obj?.pass, (err, result) => {
                        console.log(result);
                        if (result) {
                            // do a mongoquery to return all workouts with username as name
                            res.send({ loginStatus: "logged in" });
                        } else {
                            console.log("test");
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
    logic.queryAllUserWorkouts();
    res.send("ok");
});

app.get("/testExport", async (req: Request, res: Response) => {
    console.log(
        transformCSV(legacyUsername, readCSV("./workouts_to_enter.csv"))
    );
    res.send(transformCSV(legacyUsername, readCSV("./workouts_to_enter.csv")));
});

// app.listen(PORT, () => {
//    console.log(`Server succesfully started on port : ${PORT} !`);
// });

export default app;
// export types to separate file and add them to this
// add error when username exist when creating a new user
//

// hash from loginBox and Register are different
