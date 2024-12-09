import fs from "fs";
import { testData } from "./testdata.js";

const data = fs.readFileSync("./day9/data.txt", "utf-8");

const part1 = (data: string): number => {
  const dataArray = [];
  let id = 0;
  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      for (let j = 1; j <= +data[i]; j++) {
        dataArray.push(id);
      }
      id++;
    } else {
      for (let j = 1; j <= +data[i]; j++) {
        dataArray.push(".");
      }
    }
  }

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i] === ".") {
      for (let j = dataArray.length - 1; j > i; j--) {
        if (dataArray[j] !== ".") {
          dataArray[i] = dataArray[j];
          dataArray[j] = ".";
          break;
        }
      }
    }
  }
  return dataArray.reduce(
    (acc, curr, i) => (curr === "." ? acc : acc + Number(curr) * i),
    0
  );
};

console.log(part1(testData));
console.log(part1(data));
