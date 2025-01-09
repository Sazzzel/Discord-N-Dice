// Die class to represent different types of dice and their rolling mechanism
export default class Die {
    
    // Object containing different types of dice and their maximum roll values
    dice = {
        d3: 3,
        d4: 4,
        d6: 6,
        d8: 8,
        d10: 10,
        d12: 12,
        d20: 20,
    }

    /**
     * Rolls a specified number of dice with a given maximum roll value.
     * @param {number} dice - The number of dice to roll.
     * @param {number} maxroll - The maximum value that can be rolled on a single die.
     * @returns {number} The total result of all dice rolls.
     */
    roll(dice, maxroll) {
        let result = 0;
        for (let i = 0; i < dice; i++) {
            result += Math.floor(Math.random() * maxroll + 1);
        }
        return result;
    }
}