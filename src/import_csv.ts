import * as fs from "fs";

function readCSV(path: string): string {
  const rawData = fs.readFileSync(path, { encoding: "utf8" });
  return rawData;
}

const pathCsv = "workouts_to_enter.csv";
let csvFile = readCSV(pathCsv);

// trzeba podzielic workout od samych cwiczen
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

let regexDate = /(\d\d[\.]\d\d[\.]\d\d\d\d)/gm;

let dates = csvFile.match(regexDate);
// console.log(dates)

let rows = csvFile.split("\n");
let hours: Array<string> = [];

rows.forEach((row) => {
  if (row.match(/\d\d[\:]\d\d/g)) {
    // console.log(row)
    hours.push(row);
  }
});

// console.log(hours)
let pureCSV = csvFile.replace(/\s/gm, ",");
pureCSV = pureCSV + "00.00.0000,,,";

// console.log(pureCSV) /
let seriesRx = /(?<=total,,)(.+?)(?=\d\d[\.])/gm;
let serie = pureCSV.match(seriesRx);

let decons: any = [];
let singleSei = [];
serie?.forEach((seria) => {
  singleSei = seria.split(/[\,]/g);
  decons.push(singleSei);
  singleSei = [];
});

decons.forEach( (wok: any) => {
	wok.forEach((sig: any) => { console.log(sig) } )
}
)
// jezeli index i+8 jest pusty to znaczy ze trzeba spierdalać
