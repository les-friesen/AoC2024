import { inputData } from "./data";

const part2 = (input: string) => {
  const lines = input.split("\n");
  const points = lines.map((line) => line.split(",").map(Number));
  const first1024 = points.slice(0, 1024);

  let grid = Array.from({ length: 71 }, () =>
    Array.from({ length: 71 }, () => ".")
  );

  for (const point of first1024) {
    grid[point[1]][point[0]] = "#";
  }

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const pointsToCheck = points.slice(1024);

  for (const point of pointsToCheck) {
    grid[point[1]][point[0]] = "#";

    const startPos = [0, 0];

    type Position = number[];
    type Direction = [number, number];
    type QueueEntry = [Position, Direction, number];

    const queue: QueueEntry[] = [[startPos, [1, 0], 0]];
    const visited = new Map<string, number>();
    let pathFound = false;

    while (queue.length > 0) {
      const [position, dir, score] = queue.shift()!;
      const [x, y] = position;
      const [dx, dy] = dir;

      if (x > 70 || y > 70 || x < 0 || y < 0) {
        continue;
      }

      if (x === 70 && y === 70) {
        pathFound = true;
        break;
      }

      const key = `${x},${y},${dx},${dy}`;
      if (visited.has(key)) {
        continue;
      }

      visited.set(key, score);

      for (const newDir of dirs) {
        const [newDx, newDy] = newDir;
        if (newDx === -dx && newDy === -dy) continue;

        const newX = x + newDx;
        const newY = y + newDy;

        if (newX < 0 || newX > 70 || newY < 0 || newY > 70) continue;
        if (grid[newY][newX] === "#") continue;

        queue.push([[newX, newY], [newDx, newDy], score + 1]);
      }
    }

    if (!pathFound) {
      return point;
    }
  }

  return null;
};

console.log(part2(inputData));
