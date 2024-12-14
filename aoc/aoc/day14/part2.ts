import { testData } from "./testdata";
import { inputData } from "./data";

const data = inputData.split("\n").map((d) => d.split(" "));
const test = testData.split("\n").map((d) => d.split(" "));

const part2 = (data: string[][], width: number, height: number) => {
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

  // Based on assumption that the safety factor is smallest when the tree converges in one of the quadrants
  // Works for this input, but wouldn't work if the tree is in the middle of the grid
  // Arbitrarily chose 10000 seconds as the upper limit and it worked.
  const calcSafetyArea = (data: number[][], time: number) => {
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

  let lowestArea = Infinity;
  let lowestTime = 0;

  for (let i = 1; i < 10000; i++) {
    const area = calcSafetyArea(dataArray, i);
    if (area < lowestArea) {
      lowestArea = area;
      lowestTime = i;
    }
  }
  return lowestTime;
};

console.log(part2(data, 101, 103));
