import { testData } from "./testdata";
import { inputData } from "./data";

const data = inputData.split("\n");
const test = testData.split("\n");

const part2 = (data: string[]): number => {
  const cache = new Map<string, string>();
  let total = 0;

  const getKey = (x: number, y: number): string => `${x},${y}`;

  const findPlot = (x: number, y: number): number => {
    const vegetable = data[y][x];
    let area = 1;
    let corners = countCorners(x, y);

    const dirs = [
      [0, 1], // East  (0)
      [1, 0], // South (1)
      [0, -1], // West  (2)
      [-1, 0], // North (3)
    ];

    let queue = [[x, y]];
    const visited = new Set<string>();
    visited.add(getKey(x, y));
    cache.set(getKey(x, y), vegetable);

    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;

      for (const [dx, dy] of dirs) {
        const nx = cx + dx;
        const ny = cy + dy;
        const newKey = getKey(nx, ny);

        if (
          nx >= 0 &&
          nx < data[0].length &&
          ny >= 0 &&
          ny < data.length &&
          !visited.has(newKey)
        ) {
          if (data[ny][nx] === vegetable) {
            area++;
            corners += countCorners(nx, ny);
            queue.push([nx, ny]);
            visited.add(newKey);
            cache.set(newKey, vegetable);
          }
        }
      }
    }
    return area * corners;
  };

  const countCorners = (x: number, y: number): number => {
    const dirs = [
      [0, 1], // East  (0)
      [1, 0], // South (1)
      [0, -1], // West  (2)
      [-1, 0], // North (3)
    ];

    const plant = data[y][x];

    return [0, 1, 2, 3]
      .map((d) => {
        const [dx1, dy1] = dirs[d];
        const [dx2, dy2] = dirs[(d + 1) % 4];
        return [
          plant,
          data[y + dy1]?.[x + dx1], // left neighbor
          data[y + dy2]?.[x + dx2], // right neighbor
          data[y + dy1 + dy2]?.[x + dx1 + dx2], // diagonal
        ];
      })
      .filter(
        ([plant, left, right, diagonal]) =>
          (left !== plant && right !== plant) ||
          (left === plant && right === plant && diagonal !== plant)
      ).length;
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

console.log(part2(test));
console.log(part2(data));
