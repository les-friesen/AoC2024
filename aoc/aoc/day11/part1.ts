import { inputData } from "./data";
import { testData } from "./testdata";

const data = inputData.split(" ").map(Number);
const test = testData.split(" ").map(Number);

const part1 = (data: number[]): number => {
  let prevArray = data;
  const stepCount = 25;
  for (let i = 1; i <= stepCount; i++) {
    let newArray = [];
    prevArray.forEach((num) => {
      if (num === 0) {
        newArray.push(1);
      } else if (num.toString().length % 2 === 0) {
        const halfLength = Math.floor(num.toString().length / 2);
        const firstHalf = num.toString().slice(0, halfLength);
        const secondHalf = num.toString().slice(halfLength);
        newArray.push(Number(firstHalf));
        newArray.push(Number(secondHalf));
      } else {
        newArray.push(num * 2024);
      }
    });
    prevArray = newArray;
  }
  return prevArray.length;
};

console.log(part1(test));
console.log(part1(data));
