import fs from "fs";
import { testData } from "./testdata.js";

const data = fs.readFileSync("./day9/data.txt", "utf-8");

const part2 = (data: string): number => {
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

  for (let i = dataArray.length - 1; i >= 0; i--) {
    if (dataArray[i] !== ".") {
      // Calculate the size of the current group
      let groupSize = 1;
      for (let j = i - 1; j >= 0; j--) {
        if (dataArray[j] === dataArray[i]) {
          groupSize++;
        } else {
          break;
        }
      }

      // Look for a space with enough consecutive dots to fit the group
      for (let k = 0; k <= i - groupSize; k++) {
        let hasEnoughSpace = true;
        if (dataArray[k] === ".") {
          // Check if there are enough consecutive dots
          for (let l = k; l < k + groupSize; l++) {
            if (dataArray[l] !== ".") {
              hasEnoughSpace = false;
              break;
            }
          }
          if (hasEnoughSpace) {
            // Move the group to the new position
            for (let l = k; l < k + groupSize; l++) {
              dataArray[l] = dataArray[i];
            }
            // Clear the original positions of the group
            for (let j = i; j > i - groupSize; j--) {
              dataArray[j] = ".";
            }
            break;
          }
        }
      }
      // Adjust the index to skip over the group that was just processed
      i -= groupSize - 1;
    }
  }

  return dataArray.reduce(
    (acc, curr, i) => (curr === "." ? acc : acc + Number(curr) * i),
    0
  );
};

console.log(part2(testData));
console.log(part2(data));
