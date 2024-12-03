import { inputData } from "./data.js";

export const parseInput = (input: string) => {
    return input.split("\n").map(line => line.split(" ").map(number => parseInt(number)))
}

const part1 = (input: string) => {
    const data = parseInput(input)
    let safe = 0;
    
    const isSafe = (report: number[]): boolean => {
        if (report[0] === report[1]) {
            return false
        }
        const dir = report[0] > report[1] ? "down" : "up"
        for (let i = 1; i < report.length; i++) {
            const curr = report[i];
            const prev = report[i - 1];

            const diff = Math.abs(curr - prev);
            if (diff < 1 || diff > 3) {
                return false
            }
            
            if (curr >= prev && dir === "down") {
                return false
            }
            if (curr <= prev && dir === "up") {
                return false
            }
        }
        return true
    }
    for (const report of data) {
        if (isSafe(report)) {
            safe++
        }
    }
    return safe
}

console.log(part1(inputData))

