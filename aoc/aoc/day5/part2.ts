import {inputData} from "./data.js";
import {testData} from "./testdata.js";
import {data} from "./part1.js";

const part2 = (data: [rulesObj: { [key: number]: number[] }, updates: number[][]]): number => {
    const [rulesObj, updates] = data
    const notInOrder = []
    for (const update of updates) {
        let rightOrder = true
        for (let i = 1; i < update.length; i++) {
            for (let j = 0; j < i; j++) {
                if (rulesObj[update[i]] &&
                    rulesObj[update[i]].includes(update[j])) {
                    rightOrder = false
                    break
                }
                if (!rightOrder) {
                    break
                }
            }
        }
        if (!rightOrder) {
            notInOrder.push(update)
        }
    }
    let count = 0
    for (const unorderedUpdate of notInOrder) {
        const orderedUpdate = unorderedUpdate.sort((a: number, b: number) => {
            if (rulesObj[b] && rulesObj[b].includes(a)) {
                return -1;
            } else if (rulesObj[a] && rulesObj[a].includes(b)) {
                return 1;
            }
            return 0;
            })
        count += orderedUpdate[Math.floor(orderedUpdate.length/2)]
        }
    return count 
}

console.log(part2(data(testData)));
console.log(part2(data(inputData)));

