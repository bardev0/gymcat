import * as fs from "fs";

function readCSV(path: string): string {
  const rawData = fs.readFileSync(path, { encoding: "utf8" });
  return rawData;
}

const pathCsv = "workouts_to_enter.csv";
let csvFile = readCSV(pathCsv);

let dbOfWorkouts: Array<IWorkout>;

// trzeba podzielic workout od samych cwiczen
// test nodemona
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

interface IWorkout {
  date: string;
  timeStart: string;
  timeEnd: string;
  totalDay: number | undefined;
  listaSerii: Array<ISeria>;
}

class Workout implements IWorkout {
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

// console.log(hours);

let pureCSV = csvFile.replace(/\s/gm, "%");
pureCSV = pureCSV + "%%00.00.0000,,,";

let onlyRows = pureCSV.match(/(?<=total%%)(.*?)(?=%%\d\d[\.])/g);

let wholeWorkouts = [];
// console.log(onlyRows)
onlyRows?.forEach((workout) => {
  let splitworkout = workout.split(/%%/g);
  let tempSeries = [];
  // console.log(splitworkout)
  splitworkout.forEach((row) => {
    let spitRow = row.split(/,/g);

		// TODO : DODAJ PODZIELENIE NA SERIE ZALEZNIE OD NUMERU SERII
    let tempRow: IRow = new Row(
      parseInt(spitRow[0]),
      spitRow[1],
      spitRow[2],
      parseInt(spitRow[3]),
      parseInt(spitRow[4]),
      parseInt(spitRow[5])
    );

    tempSeries.push(tempRow);
  });
});
