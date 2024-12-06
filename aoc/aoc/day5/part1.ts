import {inputData} from "./data.js";
import {testData} from "./testdata.js";

export const data = (inputData: string): [rules: { [key: number]: number[] }, updates: number[][]] => {

    const [part1, part2] = inputData.split("\n\n");

    const rulesArray = part1.split("\n").map(line => line.split("|").map(d => +d))
    
    let rulesObj = {}
    rulesArray.forEach(rule => {
        if (rulesObj[rule[0]]) {
            rulesObj[rule[0]].push(rule[1])
        } else {
            rulesObj[rule[0]] = [rule[1]]
        }
    })
    
    const updates = part2.split("\n").map(line => line.split(",").map(d => +d))
    


    return [rulesObj, updates]
}

const part1 = (data: [rulesObj: { [key: number]: number[] }, updates: number[][]]): number => {
    const [rulesObj, updates] = data

    let count = 0

    for (const update of updates) {
        
        let rightOrder = true
        for (let i = 1; i < update.length; i++) {
            
            for (let j = 0; j < i; j++) {
               
                if (rulesObj[update[i]] &&
                    rulesObj[update[i]].includes(update[j])) {
                    rightOrder = false
                    break
                }
                if (rightOrder === false) {
                    break
                }
            }
        }
        if (rightOrder) {
            count += update[Math.floor(update.length/2)]
        }
    }
    return count;
}
console.log(part1(data(testData)));
console.log(part1(data(inputData)));

