import { testData } from "./testdata";
import { inputData } from "./data";

const data = inputData.split("\n\n").map((d) => d.split("\n"));
const test = testData.split("\n\n").map((d) => d.split("\n"));

const part2 = (data: string[][]) => {
  const dataArray = [];
  data.forEach((d, i) => {
    const [A, B, prize] = d;
    const [ax, ay] = A.split(": ")[1].split(",");
    const [bx, by] = B.split(": ")[1].split(",");
    const [px, py] = prize.split(": ")[1].split(",");

    dataArray.push({
      A: {
        x: +ax.replace("X+", "").replace("Y+", ""),
        y: +ay.replace(" Y+", ""),
      },
      B: { x: +bx.replace("X+", ""), y: +by.replace(" Y+", "") },
      prize: {
        x: +px.replace("X=", "") + 10000000000000,
        y: +py.replace(" Y=", "") + 10000000000000,
      },
    });
  });

  let total = 0;

  dataArray.forEach((d) => {
    const { A, B, prize } = d;

    // Create equations:
    // A.x * a + B.x * b = prize.x
    // A.y * a + B.y * b = prize.y

    // Solve for b using elimination
    const b = (prize.y * A.x - prize.x * A.y) / (B.y * A.x - B.x * A.y);

    // Solve for a by substituting b
    const a = (prize.x - B.x * b) / A.x;
    // Only add to total if both a and b are integers
    if (Number.isInteger(a) && Number.isInteger(b) && a > 0 && b > 0) {
      total += a * 3 + b;
    }
  });

  return total;
};

console.log(part2(test));
console.log(part2(data));
