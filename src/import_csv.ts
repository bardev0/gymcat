import * as fs from "fs";

function readCSV(path: string): string {
  const rawData = fs.readFileSync(path, { encoding: "utf8" });
  return rawData;
}

const pathCsv = "workouts_to_enter.csv";
let csvFile = readCSV(pathCsv);

// trzeba podzielic workout od samych cwiczen

interface IRow {
  repetitions: number;
  muscleGroup: string;
  exerciseName: string;
  exerciseMultiplier: number;
  seriesNumber: number;
  weight: number;
  totalExercise: number;
}
class Row implements IRow {
  repetitions: number;
  muscleGroup: string;
  exerciseName: string;
  exerciseMultiplier: number;
  seriesNumber: number;
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
    this.repetitions = repetitions;
    this.muscleGroup = muscleGroup;
    this.exerciseName = exerciseName;
    this.exerciseMultiplier = exerciseMultiplier;
    this.seriesNumber = seriesNumber;
    this.weight = weight;
    this.totalExercise = 0;
  }
}

interface ISeria {
  csvInRows: Array<IRow>;
}
class Seria implements ISeria {
  csvInRows: Array<IRow>;

  constructor() {
    this.csvInRows = [];
  }

  addRow(row: IRow) {
    this.csvInRows.push(row);
  }
}

class Workout {
  date: string;
  timeStart: string;
  timeEnd: string;
  totalDay: number | undefined;
  listaSerii: Array<ISeria>;

  constructor(
    date: string,
    timeStart: string,
    timeEnd: string,
    totalDay: number
  ) {
    this.date = date;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.totalDay = totalDay;
    this.listaSerii = [];
  }

  addSeries(obj: ISeria) {
    this.listaSerii.push(obj);
  }
}
let regexDate = /(\d\d[\.]\d\d[\.]\d\d\d\d)/gm;
let dates = csvFile.match(regexDate);

let csvInRows = csvFile.split("\n");
let hours: Array<string> = [];

csvInRows.forEach((row) => {
  if (row.match(/\d\d[\:]\d\d/g)) {
    hours.push(row);
  }
});

console.log(hours);


// co jezeli jestem w stanie podzielic rows ze
// jump to new row jezeli numer serii jest mniejszy niz poprzeni numer
let pureCSV = csvFile.replace(/\s/gm, ",");
pureCSV = pureCSV + "00.00.0000,,,";
let wszystkieSerie = /(?<=total,,)(.+?)(?=\d\d[\.])/gm;
let formatedSerie = pureCSV.match(wszystkieSerie);

let workout: any = [];
let singleSei: any = [];
formatedSerie?.forEach((ser) => {
  singleSei = ser.split(/[\,]/g);
  workout.push(singleSei);
  singleSei = [];
});

// kazdy index nastepuje w odstepach co 9 !
console.log(workout[13][0])
console.log(workout[13][9])
console.log(workout[13][1])
console.log(workout[13][10])

workout.forEach(( dane:any ) => { console.log(dane)})
/** tesing clases
let row = new Row(1,"biceps","dumbbell curls",2,10,12)
let seria1 = new Seria()
seria1.addRow(row)

console.log(seria1) */
