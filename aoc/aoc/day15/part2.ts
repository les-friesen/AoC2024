import { test } from "./testdata";
import { data } from "./data";
import { smalltest2 } from "./smalltest2";

const part2 = (data: string): number => {
  const [mapString, moves] = data.split("\n\n");

  const map = mapString.split("\n").map((line) => line.split(""));

  const expandedMap = Array.from({ length: map.length }, () =>
    new Array(map[0].length * 2).fill(".")
  );

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === "#") {
        expandedMap[y][x * 2] = "#";
        expandedMap[y][x * 2 + 1] = "#";
      }
      if (map[y][x] === ".") {
        expandedMap[y][x * 2] = ".";
        expandedMap[y][x * 2 + 1] = ".";
      }
      if (map[y][x] === "@") {
        expandedMap[y][x * 2] = "@";
        expandedMap[y][x * 2 + 1] = ".";
      }
      if (map[y][x] === "O") {
        expandedMap[y][x * 2] = "[";
        expandedMap[y][x * 2 + 1] = "]";
      }
    }
  }

  const findStart = (map: string[][]): [number, number] => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === "@") return [x, y];
      }
    }
  };

  let [cx, cy] = findStart(expandedMap);

  const findAndMoveBoxes = (x: number, y: number, direction: string) => {
    let dy = 0;
    direction === "v" ? (dy = 1) : (dy = -1);

    const boxCluster = [];
    const visited = new Set<string>();
    let isBlocked = false;
    const queue = [[x, y]];
    while (queue.length > 0) {
      const current = queue.shift();

      const [x, y] = current;

      const key = `${x},${y}`;

      if (visited.has(key)) continue;
      visited.add(key);

      boxCluster.push([x, y]);

      if (expandedMap[y + dy][x] === "#") {
        isBlocked = true;
        break;
      }
      if (expandedMap[y + dy][x] === "]") {
        queue.push([x - 1, y + dy]); // Add the [ first
        queue.push([x, y + dy]); // Then the ]
      }
      if (expandedMap[y + dy][x] === "[") {
        queue.push([x, y + dy]);
        queue.push([x + 1, y + dy]);
      }
      if (expandedMap[y + dy][x] === ".") {
        boxCluster.push([x, y + dy]);
      }
    }

    if (isBlocked) {
      return false;
    }

    const originalValues = boxCluster.map(([bx, by]) => {
      const sourceValue = expandedMap[by - dy][bx];
      const isBoxPart = sourceValue === "[" || sourceValue === "]";
      const isInCluster =
        isBoxPart && boxCluster.some(([x, y]) => x === bx && y === by - dy);

      return {
        x: bx,
        y: by,
        value:
          sourceValue === "#" || (isBoxPart && !isInCluster)
            ? "."
            : sourceValue,
      };
    });

    // Then apply the changes
    for (const { x, y, value } of originalValues) {
      expandedMap[y][x] = value;
    }
    return true;
  };

  const findAndMoveBoxesLR = (x: number, y: number, direction: string) => {
    let dx = 0;
    direction === ">" ? (dx = 1) : (dx = -1);

    const boxCluster = [];
    const visited = new Set<string>();
    let isBlocked = false;
    const queue = [[x, y]];
    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue; // Add check for undefined

      const [x, y] = current;
      const key = `${x},${y}`;

      if (visited.has(key)) continue;
      visited.add(key);

      boxCluster.push([x, y]);

      if (expandedMap[y][x + dx] === "#") {
        isBlocked = true;
        break;
      }
      // If we find a [ or ], add both characters of the box
      if (expandedMap[y][x + dx] === "[") {
        queue.push([x + dx, y]); // Add the [
        queue.push([x + dx + 1, y]); // Add the ]
      }
      if (expandedMap[y][x + dx] === "]") {
        queue.push([x + dx - 1, y]); // Add the [
        queue.push([x + dx, y]); // Add the ]
      }
      if (expandedMap[y][x + dx] === ".") {
        boxCluster.push([x + dx, y]);
      }
    }

    if (isBlocked) {
      return false;
    }

    // Store original state before modifications
    const originalValues = boxCluster.map(([bx, by]) => {
      const sourceValue = expandedMap[by][bx - dx];
      const isBoxPart = sourceValue === "[" || sourceValue === "]";
      const isInCluster =
        isBoxPart && boxCluster.some(([x, y]) => x === bx - dx && y === by);

      return {
        x: bx,
        y: by,
        value:
          sourceValue === "#" || (isBoxPart && !isInCluster)
            ? "."
            : sourceValue,
      };
    });

    for (const { x, y, value } of originalValues) {
      expandedMap[y][x] = value;
    }
    return true;
  };
  // move the robot
  for (const move of moves) {
    if (move === "v") {
      if (expandedMap[cy + 1][cx] === ".") {
        expandedMap[cy + 1][cx] = "@";
        expandedMap[cy][cx] = ".";
        cy++;
      } else if (
        expandedMap[cy + 1][cx] === "[" ||
        expandedMap[cy + 1][cx] === "]"
      ) {
        const moved = findAndMoveBoxes(cx, cy, "v");
        if (moved) {
          cy++;
        }
      }
    }
    if (move === "^") {
      if (expandedMap[cy - 1][cx] === ".") {
        expandedMap[cy - 1][cx] = "@";
        expandedMap[cy][cx] = ".";
        cy--;
      } else if (
        expandedMap[cy - 1][cx] === "[" ||
        expandedMap[cy - 1][cx] === "]"
      ) {
        const moved = findAndMoveBoxes(cx, cy, "^");
        if (moved) {
          cy--;
        }
      }
    }
    if (move === ">") {
      if (expandedMap[cy][cx + 1] === ".") {
        expandedMap[cy][cx + 1] = "@";
        expandedMap[cy][cx] = ".";
        cx++;
      } else if (
        expandedMap[cy][cx + 1] === "[" ||
        expandedMap[cy][cx + 1] === "]"
      ) {
        const moved = findAndMoveBoxesLR(cx, cy, ">");
        if (moved) {
          cx++;
        }
      }
    }
    if (move === "<") {
      if (expandedMap[cy][cx - 1] === ".") {
        expandedMap[cy][cx - 1] = "@";
        expandedMap[cy][cx] = ".";
        cx--;
      } else if (
        expandedMap[cy][cx - 1] === "[" ||
        expandedMap[cy][cx - 1] === "]"
      ) {
        const moved = findAndMoveBoxesLR(cx, cy, "<");
        if (moved) {
          cx--;
        }
      }
    }
  }

  const calculateGPSCoordinates = (map: string[][]) => {
    let total = 0;
    for (let y = 1; y < map.length; y++) {
      for (let x = 1; x < map[0].length; x++) {
        if (map[y][x] === "[") {
          total += x + y * 100;
        }
      }
    }
    return total;
  };

  return calculateGPSCoordinates(expandedMap);
};

console.log(part2(smalltest2));
console.log(part2(test));
console.log(part2(data));
