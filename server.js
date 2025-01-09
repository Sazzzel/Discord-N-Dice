import char from './classes/character.js';

const character = new char('Hero', 15, 12, 14, 10, 8, 13, 'Warrior');

console.log(character.generateStatsMessage());