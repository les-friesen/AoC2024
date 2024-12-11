import { testData } from "./testdata";
import { inputData } from "./data";

const data = inputData.split("\n").map((line) => line.split("").map(Number));
const test = testData.split("\n").map((line) => line.split("").map(Number));

const part2 = (data: number[][]): number => {
  let count = 0;
  // go through grid and find each starting point (character 0)
  // for each starting point, find all paths to the end (character 9)
  // Part 2 is bascially a simplification of part 1 - we don't need to keep track of visited nodes

  const findPath = (sr: number, sc: number): number => {
    let countForThisPath = 0;
    let q = [[sr, sc, 0]];

    let dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    while (q.length) {
      let [r, c, num] = q.shift();

      if (num === 9) {
        countForThisPath++;
      } else {
        for (let [dr, dc] of dirs) {
          const newR = r + dr;
          const newC = c + dc;

          if (
            newR < 0 ||
            newC < 0 ||
            newR >= data.length ||
            newC >= data[0].length
          ) {
            continue;
          }
          if (data[newR][newC] === num + 1) {
            q.push([newR, newC, num + 1]);
          }
        }
      }
    }
    return countForThisPath;
  };

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === 0) {
        count += findPath(i, j);
      }
    }
  }
  return count;
};

console.log(part2(test));
console.log(part2(data));
