import { testData } from "./testdata";
import { inputData } from "./data";

const data = inputData.split("\n");
const test = testData.split("\n");

const part1 = (data: string[]): number => {
  const cache = new Map<string, string>();
  let total = 0;

  const getKey = (x: number, y: number): string => `${x},${y}`;

  const findPlot = (x: number, y: number): number => {
    const key = getKey(x, y);
    const vegetable = data[x][y];
    let area = 1;
    let perimeter = 0;

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    let queue = [[x, y]];
    cache.set(getKey(x, y), vegetable);
    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;
      for (const dir of dirs) {
        const [dx, dy] = dir;
        const nx = cx + dx;
        const ny = cy + dy;
        const newKey = getKey(nx, ny);
        if (
          nx < 0 ||
          nx >= data.length ||
          ny < 0 ||
          ny >= data[0].length ||
          data[nx][ny] !== vegetable
        ) {
          perimeter++;
          continue;
        }

        if (!cache.has(newKey)) {
          area++;
          queue.push([nx, ny]);
          cache.set(newKey, vegetable);
        }
      }
    }
    return area * perimeter;
  };

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (cache.has(getKey(i, j))) {
        continue;
      }
      total += findPlot(i, j);
    }
  }

  return total;
};

console.log(part1(test));
console.log(part1(data));
