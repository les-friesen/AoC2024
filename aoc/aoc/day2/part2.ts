import { inputData } from "./data.js";
import { parseInput } from "./part1.js";

const part2 = (input: string) => {
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

    const isDampened = (report: number[]): boolean => {
        let dampened = false

        for (let i = 0; i < report.length ; i++) {
            const reportCopy = report.slice()
            reportCopy.splice(i, 1)
            if (isSafe(reportCopy)) {
                dampened = true
                break
            } else {
                continue
            }
        }
        return dampened
    }

    for (const report of data) {
        if (isSafe(report) || isDampened(report)) {
            safe++
        }
    }
    return safe
}

console.log(part2(inputData))