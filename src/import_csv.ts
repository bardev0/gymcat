import * as fs from "fs";

function readCSV(path: string): string {
  const rawData = fs.readFileSync(path, { encoding: "utf8" });
  return rawData;
}

const pathCsv = "workouts_to_enter.csv";
let csvFile = readCSV(pathCsv);

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

csvFile = csvFile.replace(/\s/gm, "")
csvFile = csvFile.replace(/\n/gm, "")
csvFile = csvFile.replace(/\r/gm, "")
csvFile = csvFile + '00.00.0000'

let trainingData = csvFile.split(/(?<=\d\d[\.]\d\d[\.]\d\d\d\d)(.*?)(?=\d\d[\.]\d\d[\.]\d\d\d\d)/gm)
trainingData.pop()
// array containing dates on even indexes and data on un-even indexes

// console.log(trainingData[0]) // pure date of training 
// console.log(trainingData[1]) // pure ALL DATA
const startingDate = trainingData[1].match(/\d\d[\:]\d\d/g)
// console.log(startingDate)
// console.log(trainingData.length)

for (let i = 0; i < trainingData.length ; i+=2 ) {
		console.log('DATA ' + trainingData[i]); //startingDate

		// rozdziel dane na poszczególne kategorie
		console.log(trainingData[i+1])
}

