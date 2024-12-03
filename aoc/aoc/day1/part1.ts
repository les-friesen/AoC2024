import { inputData } from "./data.js";

const part1 = (input: string) => {
    const column1: number[] = []
    const column2: number[] = []
    input.split("\n").forEach(line => {
        const [a, b] = line.split("   ")
        column1.push(+a)
        column2.push(+b)
    })
    column1.sort()
    column2.sort()
    let total = 0
    for (let i = 0; i < column1.length; i++) {
        total += Math.abs(column2[i] - column1[i])
    }
    return total
}

console.log(part1(inputData))



