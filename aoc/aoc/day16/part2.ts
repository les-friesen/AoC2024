import { secondTest } from "./secondTest";
import { testData } from "./testdata";
import { data } from "./data";

type Position = [number, number];
type Direction = [number, number];
type QueueEntry = [Position, Direction, number, Position[]];

const part2 = (input: string) => {
  const map = input.split("\n");

  const startCol = map.findIndex((row) => row.includes("S"));
  const endCol = map.findIndex((row) => row.includes("E"));

  const startPos: Position = [map[startCol].indexOf("S"), startCol];
  const endPos: Position = [map[endCol].indexOf("E"), endCol];

  const dirs: Direction[] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let minScore = Infinity;
  const bestPathTiles = new Set<string>();

  const initialDir: Direction = [1, 0];
  const initialPath: Position[] = [startPos];
  const queue: QueueEntry[] = [[startPos, initialDir, 0, initialPath]];

  const visited = new Map<string, number>();

  while (queue.length > 0) {
    const [position, dir, score, path] = queue.shift()!;
    const [x, y] = position;
    const [dx, dy] = dir;

    if (score > minScore) {
      continue;
    }

    if (map[y][x] === "E") {
      if (score < minScore) {
        minScore = score;
        bestPathTiles.clear();
      }
      if (score === minScore) {
        path.forEach(([px, py]) => {
          bestPathTiles.add(`${px},${py}`);
        });
      }
      continue;
    }

    const key = `${x},${y},${dx},${dy}`;

    if (visited.has(key) && visited.get(key)! < score) {
      continue;
    }

    visited.set(key, score);

    for (const newDir of dirs) {
      const [newDx, newDy] = newDir;

      if (newDx === -dx && newDy === -dy) {
        continue;
      }

      const newX = x + newDx;
      const newY = y + newDy;

      if (
        newX < 0 ||
        newX >= map[0].length ||
        newY < 0 ||
        newY >= map.length ||
        map[newY][newX] === "#"
      ) {
        continue;
      }

      let newScore = score;
      if (newDx !== dx || newDy !== dy) {
        newScore += 1000;
      }
      newScore += 1;

      const newPosition: Position = [newX, newY];
      const newDirection: Direction = [newDx, newDy];
      const newPath: Position[] = [...path, newPosition];

      queue.push([newPosition, newDirection, newScore, newPath]);
    }
  }

  return bestPathTiles.size;
};

console.log(part2(testData));
console.log(part2(secondTest));
console.log(part2(data));
