import { testData } from "./testdata";
import { inputData } from "./data";

const data = inputData.split("\n").map((d) => d.split(" "));
const test = testData.split("\n").map((d) => d.split(" "));

const part1 = (
  data: string[][],
  width: number,
  height: number,
  time: number
) => {
  const dataArray = [];
  data.forEach((d, i) => {
    const [p, v] = d;
    const [px, py] = p.replace("p=", "").split(",");
    const [vx, vy] = v.replace("v=", "").split(",");
    dataArray.push([
      [+px, +py],
      [+vx, +vy],
    ]);
  });

  const finalPosition = (data: number[][], time: number) => {
    const [p, v] = data;
    // Make sure the position is positive
    const x = (((p[0] + v[0] * time) % width) + width) % width;
    const y = (((p[1] + v[1] * time) % height) + height) % height;
    return [x, y];
  };

  const middleX = Math.floor(width / 2);
  const middleY = Math.floor(height / 2);

  let tl = 0;
  let tr = 0;
  let bl = 0;
  let br = 0;

  dataArray.forEach((d) => {
    const [x, y] = finalPosition(d, time);
    if (x < middleX && y < middleY) {
      tl++;
    }
    if (x > middleX && y < middleY) {
      tr++;
    }
    if (x < middleX && y > middleY) {
      bl++;
    }
    if (x > middleX && y > middleY) {
      br++;
    }
  });

  return tl * tr * bl * br;
};

console.log(part1(test, 11, 7, 100));
console.log(part1(data, 101, 103, 100));
