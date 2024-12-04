import {inputData} from "./data.js";

const data = inputData.split("\n");

const part2 = (data: string[]): number => {
    let count = 0;

    for (let y = 0; y < data.length - 2; y++) {
        for (let x = 0; x < data[0].length - 2; x++) {
            const current = data[y][x];
                if (current === "M" && data[y + 1][x + 1] === "A" && data[y + 2][x + 2] === "S") {
                    if ((data[y][x+2] === "M" && data[y+2][x] === "S") || (data[y][x+2] === "S" && data[y+2][x] === "M")) {
                        count++;
                    }
                }
                if (current === "S" && data[y + 1][x + 1] === "A" && data[y + 2][x + 2] === "M") {
                    if ((data[y][x+2] === "M" && data[y+2][x] === "S") || (data[y][x+2] === "S" && data[y+2][x] === "M")) {
                        count++;
                    }
                }
            
        }
    }
    return count 
}

console.log(part2(data));

