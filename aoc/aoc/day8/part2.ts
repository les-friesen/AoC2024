import { inputData } from "./data.js";
import { testData } from "./testdata.js";

const testInputData = testData.split("\n");
const data = inputData.split("\n");

const part2 = (data: string[]) => {
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
        // Add the nodes to the set
        nodes.add(`${freq[i][0]}-${freq[i][1]}`);
        nodes.add(`${freq[j][0]}-${freq[j][1]}`);
        // Calculate the rise and run
        const rise = freq[j][0] - freq[i][0];
        const run = freq[j][1] - freq[i][1];

        for (let k = 0; k < 2; k++) {
          if (k === 0) {
            // calculate nodes when subtracting rise and run from the first node, until out of bounds
            let node = [freq[i][0] - rise, freq[i][1] - run];
            while (
              node[0] >= 0 &&
              node[0] < data.length &&
              node[1] >= 0 &&
              node[1] < data[0].length
            ) {
              nodes.add(`${node[0]}-${node[1]}`);
              node[0] -= rise;
              node[1] -= run;
            }
          } else {
            // calculate nodes when adding rise and run
            let node = [freq[i][0] + rise, freq[i][1] + run];
            while (
              node[0] >= 0 &&
              node[0] < data.length &&
              node[1] >= 0 &&
              node[1] < data[0].length
            ) {
              nodes.add(`${node[0]}-${node[1]}`);
              node[0] += rise;
              node[1] += run;
            }
          }
        }
      }
    }
  });
  return nodes.size;
};

console.log(part2(testInputData));
console.log(part2(data));
