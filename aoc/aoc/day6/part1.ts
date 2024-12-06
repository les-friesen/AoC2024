import {inputData} from "./data.js";
import {testData} from "./testdata.js";

const testInputData = testData.split("\n")
const data = inputData.split("\n")

const part1 = (data: string[]): number => {

    let startPosition = []
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            if (data[y][x] === "^") {
                startPosition = [y,x]
                break
            }
            if (startPosition.length) {
                break
            }
        }
        if (startPosition.length) {
            break
        }
    }

    let [row, col] = startPosition

    const cache = new Map(); 
    
    const nextPosition = (row: number, col: number, dir: string, data: string[]) => {
        
        if (row < 0 || col < 0 || row === data.length || col === data[0].length) {
            return 
        }

        const key = `${row}-${col}-${dir}`;
        if (cache.has(key)) {
            return 
        }

        cache.set(`${row}-${col}-${dir}`, `${row}-${col}`)

        if (dir === "N") {
            if (row === 0) {
                return
            } else if (data[row-1][col] === "#"){
                nextPosition(row, col+1, "E", data)
            } else {
                nextPosition(row-1, col, "N", data)
            }
        }

        if (dir === "E") {
            if (col === data[0].length - 1) {
                return
            } else if (data[row][col+1] === "#") {
                nextPosition(row+1, col, "S", data)
            } else {
                nextPosition(row, col+1, "E", data)
            }
        }

        if (dir === "S") {
            if (row === data.length - 1) {
                return
            } else if (data[row+1][col] === "#"){
                nextPosition(row, col-1, "W", data)
            } else {
                nextPosition(row+1, col, "S", data)
            }
        }

        if (dir === "W") {
            if (col === 0) {
                return
            } else if (data[row][col-1] === "#") {
                nextPosition(row-1, col, "N", data)
            } else {
                nextPosition(row, col-1, "W", data)
            }
        }
    }

    const countSpots = (data: string[]) => {
        nextPosition(row, col, "N", data); 
        let spots = new Set(cache.values())
        return spots.size
    }

    return countSpots(data)
}

console.log(part1(testInputData))
console.log(part1(data))
