import { testData } from "./testdata";
import { data } from "./data";

const part1 = (data: string) => {
  const lines = data.split("\n").map((line) => line.split(": "));
  const equations: [number, number[]][] = [];

  for (const line of lines) {
    const [id, rest] = line;
    const target = parseInt(id);
    const numbers = rest.trim().split(" ").map(Number);
    equations.push([target, numbers]);
  }

  let count = 0;

  for (const [target, numbers] of equations) {
    let previousRound = [];
    for (let x = 1; x < numbers.length; x++) {
      let currentRound = [];
      if (x === 1) {
        previousRound.push(numbers[x - 1]);
      }
      for (let y = 0; y <= 2; y++) {
        previousRound.forEach((value) => {
          if (y === 0) {
            currentRound.push(value * numbers[x]);
          }
          if (y === 1) {
            currentRound.push(value + numbers[x]);
          }
          if (y === 2) {
            currentRound.push(+("" + value + numbers[x]));
          }
        });
      }
      previousRound = currentRound;
    }
    if (previousRound.includes(target)) {
      count += target;
    }
  }
  return count;
};

console.log(part1(testData));
console.log(part1(data));
