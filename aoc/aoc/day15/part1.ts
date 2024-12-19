import { test } from "./testdata";
import { data } from "./data";
import { smalltest1 } from "./smalltest1";

const part1 = (data: string): number => {
  const [mapString, moves] = data.split("\n\n");
  const map = mapString.split("\n").map((line) => line.split(""));

  const findStart = (map: string[][]): [number, number] => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === "@") return [x, y];
      }
    }
  };

  let [cx, cy] = findStart(map);

  // move the robot
  for (const move of moves) {
    if (move === "v") {
      for (let i = cy + 1; i < map.length - 1; i++) {
        if (map[i][cx] === "#") {
          break;
        }
        if (map[i][cx] === ".") {
          map[i][cx] = "O";
          map[cy][cx] = ".";
          map[cy + 1][cx] = "@";
          cy++;
          break;
        }
      }
    }
    if (move === "^") {
      for (let i = cy - 1; i > 0; i--) {
        if (map[i][cx] === "#") {
          break;
        }
        if (map[i][cx] === ".") {
          map[i][cx] = "O";
          map[cy][cx] = ".";
          map[cy - 1][cx] = "@";
          cy--;
          break;
        }
      }
    }
    if (move === ">") {
      for (let i = cx + 1; i < map[0].length - 1; i++) {
        if (map[cy][i] === "#") {
          break;
        }
        if (map[cy][i] === ".") {
          map[cy][i] = "O";
          map[cy][cx] = ".";
          map[cy][cx + 1] = "@";
          cx++;
          break;
        }
      }
    }
    if (move === "<") {
      for (let i = cx - 1; i > 0; i--) {
        if (map[cy][i] === "#") {
          break;
        }
        if (map[cy][i] === ".") {
          map[cy][i] = "O";
          map[cy][cx] = ".";
          map[cy][cx - 1] = "@";
          cx--;
          break;
        }
      }
    }
  }

  const calculateGPSCoordinates = (map: string[][]) => {
    let total = 0;
    for (let y = 1; y < map.length; y++) {
      for (let x = 1; x < map[0].length; x++) {
        if (map[y][x] === "O") {
          total += x + y * 100;
        }
      }
    }
    return total;
  };

  return calculateGPSCoordinates(map);
};

console.log(part1(smalltest1));
console.log(part1(test));
console.log(part1(data));
