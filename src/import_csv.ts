import * as fs from "fs";

function readCSV(path: string): string {
  const rawData = fs.readFileSync(path, { encoding: "utf8" });
  return rawData;
}

// console.log(process.cwd())
const pathCsv = "workouts_to_enter.csv";
const csvFile = readCSV(pathCsv);

console.log(csvFile);

class Workout {
  date: string;
  timeStart: string;
  timeEnd: string;
  muscleGroup: string;
  exerciseName: string;
  exerciseMultiplier: number;
  series: number;
  repetitions: number;
  totalSeries: number | undefined;
  totalExercice: number | undefined;
  totalDay: number | undefined;
  rest?;

  constructor(
    date: string,
    timeStart: string,
    timeEnd: string,
    muscleGroup: string,
    exerciseName: string,
    exerciseMultiplier: number,
    series: number,
    repetitions: number,
    totalSeries: number,
    totalExercice: number,
    totalDay: number,
    rest: any
  ) {
    this.date = date;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.muscleGroup = muscleGroup;
    this.exerciseName = exerciseName;
    this.exerciseMultiplier = exerciseMultiplier;
    this.series = series;
    this.repetitions = repetitions;
    this.totalSeries = totalSeries;
    this.totalExercice = totalExercice;
    this.totalDay = totalDay;
    this.rest = rest;
  }
}
//split file into arrays with each indivdual workout being on object
//remove whitespce characters
// csvFile.replace(/\n/, "")
// csvFile.replace(/\r/, "")
// const workoutList = csvFile.split(/2{\d}/)
console.log(csvFile)
