import fs from 'fs';

const data = fs.readFileSync('./day3/data.txt', 'utf-8');

const matches = data.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g);

let total = 0;
let isDisabled = false; 
matches.forEach((match) => {
    
    if (match === "do()") {
        isDisabled = false;
    }

    if (match === "don't()") {
        isDisabled = true;
    }
    if (match.includes('mul') && !isDisabled) {
        const pair = match.slice(4, -1).split(',').map(x => +x)
        total += pair[0] * pair[1];
    }
})

console.log(total)