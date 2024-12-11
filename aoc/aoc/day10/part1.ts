import { testData } from "./testdata";
import { inputData } from "./data";

const data = inputData.split("\n").map((line) => line.split("").map(Number));
const test = testData.split("\n").map((line) => line.split("").map(Number));

const part1 = (data: number[][]): number => {
  let count = 0;
  console.log(data);
  // go through and find each starting point (character 0)
  // for each starting point, find all paths to the end (character 9)

  const findPath = (sr: number, sc: number): number => {
    let countForThisPath = 0;
    let q = [[sr, sc, 0]];
    const visited = new Set();
    visited.add(`${sr},${sc}`);

    let dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    while (q.length) {
      let [r, c, num] = q.shift();
      console.log("currently processing", r, c, num);

      if (num === 9) {
        countForThisPath++;
      } else {
        for (let [dr, dc] of dirs) {
          const newR = r + dr;
          const newC = c + dc;
          const key = `${newR},${newC}`;

          if (
            newR < 0 ||
            newC < 0 ||
            newR >= data.length ||
            newC >= data[0].length
          ) {
            continue;
          }

          if (!visited.has(key) && data[newR][newC] === num + 1) {
            visited.add(key);
            q.push([newR, newC, num + 1]);
          }
        }
      }
    }
    console.log(`count for path ${sr}, ${sc}`, countForThisPath);
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

console.log(part1(test));
console.log(part1(data));
