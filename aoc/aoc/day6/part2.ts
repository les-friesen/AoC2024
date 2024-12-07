import { inputData } from "./data.js";
import { testData } from "./testdata.js";

const testInputData = testData.split("\n");
const data = inputData.split("\n");

const part2 = (data: string[]): number => {
  // Find start position
  let startRow = 0,
    startCol = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      if (data[y][x] === "^") {
        [startRow, startCol] = [y, x];
        break;
      }
    }
    if (startRow !== 0 || startCol !== 0) {
      break;
    }
  }

  let cycleCount = 0;

  // Test every position
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
      if (data[row][col] === ".") {
        // Create modified data with obstacle
        const modifiedData = data.map((row) => row);
        modifiedData[row] =
          modifiedData[row].slice(0, col) +
          "#" +
          modifiedData[row].slice(col + 1);

        // Check if this creates a cycle
        if (checkForCycle(modifiedData, startRow, startCol, row, col)) {
          cycleCount++;
        }
      }
    }
  }

  return cycleCount;
};

const checkForCycle = (
  data: string[],
  startR: number,
  startC: number,
  obsR: number,
  obsC: number
): boolean => {
  const visited = new Map();
  let currentR = startR;
  let currentC = startC;
  let dir = "N";

  while (true) {
    if (
      currentR <= 0 ||
      currentR >= data.length - 1 ||
      currentC <= 0 ||
      currentC >= data[0].length - 1
    ) {
      return false;
    }

    const key = `${currentR},${currentC},${dir}`;
    if (visited.has(key)) {
      return true;
    }

    visited.set(key, true);

    const moves = {
      N: [-1, 0],
      E: [0, 1],
      S: [1, 0],
      W: [0, -1],
    };
    const nextDir = { N: "E", E: "S", S: "W", W: "N" };

    const [dRow, dCol] = moves[dir];
    const newR = currentR + dRow;
    const newC = currentC + dCol;

    if (data[newR][newC] === "#" || (newR === obsR && newC === obsC)) {
      dir = nextDir[dir];
    } else {
      currentR = newR;
      currentC = newC;
    }
  }
};

console.log(part2(testInputData));
console.log(part2(data));
