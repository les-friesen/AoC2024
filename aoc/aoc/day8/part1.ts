import { inputData } from "./data.js";
import { testData } from "./testdata.js";

const testInputData = testData.split("\n");
const data = inputData.split("\n");

const part1 = (data: string[]) => {
  // Find all the same characters.
  // Find the two nodes for every pair of characters and put in map
  // Create a set of the map values
  // Return the size of the set

  let charMap: { [key: string]: number[][] } = {};

  for (let col = 0; col < data.length; col++) {
    for (let row = 0; row < data[0].length; row++) {
      if (data[col][row] === ".") {
        continue;
      }
      if (charMap[data[col][row]]) {
        charMap[data[col][row]].push([col, row]);
      } else {
        charMap[data[col][row]] = [[col, row]];
      }
    }
  }

  let nodes = new Set<string>();

  Object.values(charMap).forEach((freq: number[][]) => {
    for (let i = 0; i < freq.length; i++) {
      for (let j = i + 1; j < freq.length; j++) {
        const rise = freq[j][0] - freq[i][0];
        const run = freq[j][1] - freq[i][1];

        const node1 = [freq[i][0] - rise, freq[i][1] - run];
        const node2 = [freq[j][0] + rise, freq[j][1] + run];

        if (
          node1[0] >= 0 &&
          node1[0] < data.length &&
          node1[1] >= 0 &&
          node1[1] < data[0].length
        ) {
          nodes.add(`${node1[0]}-${node1[1]}`);
        }
        if (
          node2[0] >= 0 &&
          node2[0] < data.length &&
          node2[1] >= 0 &&
          node2[1] < data[0].length
        ) {
          nodes.add(`${node2[0]}-${node2[1]}`);
        }
      }
    }
  });
  return nodes.size;
};

console.log(part1(testInputData));
console.log(part1(data));
