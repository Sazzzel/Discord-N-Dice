import Die from './dice.js';

console.log('Rolling a d20...');
const die = new Die();
const rollResult = die.roll(8, die.dice.d20);
console.log('Rolled:', rollResult);

// roll 8d20 10000 times and record highest roll
let highestRoll = 0;
for (let i = 0; i < 100000000; i++) {
    const roll = die.roll(4, die.dice.d20);
    if (roll > highestRoll) {
        highestRoll = roll;
    }
}
console.log('Highest roll:', highestRoll);