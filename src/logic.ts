import { MongoClient } from "mongodb";
const uri =
    "mongodb+srv://greg1111:Rgbi5QPJQCck3eox@cluster0.nsckr5l.mongodb.net/Cluester0";
const client = new MongoClient(uri);

type TdbExercTemp = {
    muscleG: string;
    exerc: string;
};

type TUser = {
    user: string;
};

type TUserExercise = TUser & TdbExercTemp;

async function addUserExercisce(args: TUserExercise) {
    const database = client.db("Cluester0");
    const userExercises = database.collection("UserExercices");

    const result = await userExercises.insertOne(args);
    console.log(result);
}

async function addTemplateExercise(args: TdbExercTemp) {
    const database = client.db("Cluester0");
    const exercises = database.collection("Exercices");

    const result = await exercises.insertOne(args);

    console.log(result);
}

// async function grabExercic(agrs: TUser) {
async function grabExercic() {
    let allE: any = [];
    const database = client.db("Cluester0");
    const col = database.collection("Exercices");

    const result = await col.find({}).toArray();
    const col2 = database.collection("UserExercices");
    const result2 = await col2.find({ user: "greg" }).toArray();

    result.forEach((result) => {
        allE.push(result);
    });
    result2.forEach((result) => {
        allE.push(result);
    });

    return allE;
}

async function addWorkout(workout: any) {
    console.log(workout);

    const database = client.db("Cluester0");
    const col = database.collection("Workouts");
    const result = await col.insertOne(workout);

    // console.log(result);
}

const logic = {
    addUserExercisce,
    addTemplateExercise,
    grabExercic,
    addWorkout,
};
export default logic;
