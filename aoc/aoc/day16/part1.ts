import { secondTest } from "./secondTest";
import { testData } from "./testdata";
import { data } from "./data";

const part1 = (input: string) => {
  const map = input.split("\n");

  const startCol = map.findIndex((row) => row.includes("S"));
  const endCol = map.findIndex((row) => row.includes("E"));

  const startPos = [map[startCol].indexOf("S"), startCol];
  const endPos = [map[endCol].indexOf("E"), endCol];

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  type Position = number[];
  type Direction = [number, number];
  type QueueEntry = [Position, Direction, number];

  let minScore = Infinity;

  const queue: QueueEntry[] = [[startPos, [1, 0], 0]];

  const visited = new Map<string, number>();

  while (queue.length > 0) {
    const [position, dir, score] = queue.shift();

    const [x, y] = position;
    const [dx, dy] = dir;

    // Check if we've reached the end
    if (map[y][x] === "E") {
      minScore = Math.min(minScore, score);
      continue; // No need to explore further from end position
    }

    const key = `${x},${y}, ${dx},${dy}`;

    if (visited.has(key) && visited.get(key)! <= score) {
      continue;
    }

    // Record this as the best score for this position+direction
    visited.set(key, score);

    for (const newDir of dirs) {
      const [newDx, newDy] = newDir;

      // Skip opposite direction
      if (newDx === -dx && newDy === -dy) {
        continue;
      }

      // Calculate new position
      const newX = x + newDx;
      const newY = y + newDy;

      // Skip if out of bounds or hits a wall
      if (map[newY][newX] === "#") {
        // Check for wall
        continue;
      }

      // Calculate new score
      let newScore = score;

      // Add turn cost if direction changed
      if (newDx !== dx || newDy !== dy) {
        newScore += 1000;
      }

      newScore += 1; // Step cost

      queue.push([[newX, newY], [newDx, newDy], newScore]);
    }
  }

  return minScore;
};

console.log(part1(testData));
console.log(part1(secondTest));
console.log(part1(data));
