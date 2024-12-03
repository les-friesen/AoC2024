import fs from 'fs';

const data = fs.readFileSync('./day3/data.txt', 'utf-8');

const matches = data.match(/mul\(\d{1,3},\d{1,3}\)/g);

let total = 0;

for (const match of matches) {
  const pair = match.slice(4, -1).split(',').map(x => +x)
  total += Number(pair[0]) * Number(pair[1]);
}

console.log(total);
