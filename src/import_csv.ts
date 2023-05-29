import * as fs from "fs";

function readCSV(path: string): string {
  const rawData = fs.readFileSync(path, { encoding: "utf8" });
  return rawData;
}

// console.log(process.cwd())
const pathCsv = "workouts_to_enter.csv";
const csvFile = readCSV(pathCsv);

console.log(csvFile);
