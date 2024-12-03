import { inputData } from "./data.js";

const part2 = (input: string) => {
    const column1: number[] = []
    const column2: number[] = []
    input.split("\n").forEach(line => {
        const [a, b] = line.split("   ")
        column1.push(+a)
        column2.push(+b)
    })
    let total = 0
    for (let i = 0; i < column1.length; i++) {
        let factor = 0
        for (let j = 0; j < column2.length; j++) {
            if (column2[j] === column1[i]) {
                factor += 1
            }
        }
        total += column1[i] * factor
    }
    return total
}

console.log(part2(inputData))