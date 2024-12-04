import {inputData} from "./data.js";

const data = inputData.split("\n");

const part1 = (data: string[]): number => {
    let count = 0;

    for (let y = 0; y < data.length; y++) {
       for (let x = 0; x < data[0].length; x++) {

            const current = data[y][x];

            if (current === "X") {
                // check right 
                if (x < data[0].length - 3) {
                    if (data[y][x + 1] === "M" && data[y][x + 2] === "A" && data[y][x + 3] === "S") {
                        count++;
                    }
                }
                // check right down diagonal
                if (x < data[0].length - 3 && y < data.length - 3) {
                    if (data[y + 1][x + 1] === "M" && data[y + 2][x + 2] === "A" && data[y + 3][x + 3] === "S") {
                        count++;
                    }
                }
                // check down
                if (y < data.length - 3) {
                    if (data[y + 1][x] === "M" && data[y + 2][x] === "A" && data[y + 3][x] === "S") {
                        count++;
                    }
                }
                // check left down diagonal
                if (x > 2 && y < data.length - 3) {
                    if (data[y + 1][x - 1] === "M" && data[y + 2][x - 2] === "A" && data[y + 3][x - 3] === "S") {
                        count++;
                    }
                }
                // check left
                if (x > 2) {
                    if (data[y][x - 1] === "M" && data[y][x - 2] === "A" && data[y][x - 3] === "S") {
                        count++;
                    }
                }
                // check left up diagonal
                if (x > 2 && y > 2) {
                    if (data[y - 1][x - 1] === "M" && data[y - 2][x - 2] === "A" && data[y - 3][x - 3] === "S") {
                        count++;
                    }
                }
                // check up
                if (y > 2) {
                    if (data[y - 1][x] === "M" && data[y - 2][x] === "A" && data[y - 3][x] === "S") {
                        count++;
                    }
                }
                // check right up diagonal
                if (x < data[0].length - 3 && y > 2) {
                    if (data[y - 1][x + 1] === "M" && data[y - 2][x + 2] === "A" && data[y - 3][x + 3] === "S") {
                        count++;
                    }
                }
            }
       }
    }

    return count;
}

console.log(part1(data));

