import * as fs from "fs";

function readCSV(path: string): string {
  const rawData = fs.readFileSync(path, { encoding: "utf8" });
  return rawData;
}

const pathCsv = "workouts_to_enter.csv";
let csvFile = readCSV(pathCsv);

interface IRow {
  seriesNumber: number;
  muscleGroup: string;
  exerciseName: string;
  exerciseMultiplier: number;
  repetitions: number;
  weight: number;
  totalExercise: number;
}

class Row implements IRow {
  seriesNumber: number;
  muscleGroup: string;
  exerciseName: string;
  exerciseMultiplier: number;
  repetitions: number;
  weight: number;
  totalExercise: number;

  constructor(
    seriesNumber: number,
    muscleGroup: string,
    exerciseName: string,
    exerciseMultiplier: number,
    repetitions: number,
    weight: number
  ) {
    this.seriesNumber = seriesNumber;
    this.muscleGroup = muscleGroup;
    this.exerciseName = exerciseName;
    this.exerciseMultiplier = exerciseMultiplier;
    this.repetitions = repetitions;
    this.weight = weight;
    this.totalExercise = this.calcTotal();
  }

  calcTotal() {
    return this.exerciseMultiplier * (this.repetitions * this.weight);
  }
}

interface IWorkout {
  workoutOwner: string;
  workoutNumber: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  listOfRows: Array<IRow>;
  totalDay: number | undefined;

  addRows: Function;
}

class Workout implements IWorkout {
  workoutOwner: string;
  workoutNumber: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  listOfRows: Array<IRow>;
  totalDay: number | undefined;

  constructor(
    workoutOwner: string,
    workNum: number,
    date: string,
    timeStart: string,
    timeEnd: string
  ) {
    this.workoutOwner = workoutOwner;
    this.workoutNumber = workNum;
    this.date = date;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.listOfRows = [];
    this.totalDay = 0;
  }

  addRows(obj: any) {
    this.listOfRows.push(obj);
    this.totalDay = this.totalDay + obj.totalExercise;
  }
}

function transformCSV(workoutUser: any, csv: string): Array<IWorkout> {
  let regexDate = /(\d\d[\.]\d\d[\.]\d\d\d\d)/gm;
  let dates = csv.match(regexDate);

  let csvInRows = csv.split("\n");
  let hours: Array<string> = [];

  csvInRows.forEach((row) => {
    if (row.match(/\d\d[\:]\d\d/g)) {
      hours.push(row);
    }
  });

  let pureStringCsv = csv.replace(/\s/gm, "%");
  pureStringCsv = pureStringCsv + "%%00.00.0000,,,";

  let onlyRows = pureStringCsv.match(/(?<=total%%)(.*?)(?=%%\d\d[\.])/g);

  let allWorkouts: Array<IWorkout> = [];
  let c1 = 0;
  onlyRows?.forEach((workout) => {
    let currentDate = dates![c1];
    let currentHours = hours![c1];
    let [hoursStart, hoursEnd] = currentHours.split(/\,/);
    let splitworkout = workout.split(/%%/g);
    let tempWork = new Workout(
      workoutUser,
      c1,
      currentDate,
      hoursStart,
      hoursEnd
    );
    splitworkout.forEach((row) => {
      let spitRow = row.split(/,/g);
      let rowSerNum = parseInt(spitRow[0]) || 0;
      if (rowSerNum != 0) {
        let tempRow: IRow = new Row(
          parseInt(spitRow[0]),
          spitRow[1],
          spitRow[2],
          parseInt(spitRow[3]),
          parseInt(spitRow[4]),
          parseInt(spitRow[5])
        );
        tempWork.addRows(tempRow);
      }
    });
    allWorkouts.push(tempWork);
    c1++;
  });

  return allWorkouts;
}

// let output = transformCSV(csvFile)
// console.log(output)

export { transformCSV, readCSV };
