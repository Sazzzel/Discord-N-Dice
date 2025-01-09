// CharacterSheet.js
/* Example usage
(async () => {
  const character = new CharacterSheet('Hero', 15, 12, 14, 10, 8, 13, 'Mage');
  console.log('Created Character:', character);

  const filePath = './hero.json';

  // Save to file
  await character.saveToFile(filePath);
  console.log('Character saved to file.');

  // Load from file
  const loadedCharacter = await CharacterSheet.loadFromFile(filePath);
  console.log('Loaded Character:', loadedCharacter);
})();
*/

import fs from 'fs/promises';

class CharacterSheet {
  constructor(name, strength = 10, dexterity = 10, constitution = 10, intelligence = 10, wisdom = 10, charisma = 10, role = "Warrior") {
    this.name = name;
    this.attributes = {
      Strength: strength,
      Dexterity: dexterity,
      Constitution: constitution,
      Intelligence: intelligence,
      Wisdom: wisdom,
      Charisma: charisma,
    };
    this.role = role;
    this.hitPoints = this.calculateMaxHitPoints();
    this.xp = 0;
    this.level = 1;
    this.attributePoints = 0;
  }

  /**
   * Calculates the maximum hit points for this character
   * using the Constitution attribute.
   *
   * @returns {number} The calculated hit point value.
   */
  calculateMaxHitPoints() {
    return 10 + this.attributes.Constitution;
  }

  /**
   * Rolls a d20 and adds the chosen attribute bonus to the result.
   *
   * @param {string} attributeName - Name of the attribute to use.
   * @returns {number} The final roll result.
   */
  rollAttribute(attributeName) {
    // Example: roll 1d20 + attribute
    const baseRoll = Math.floor(Math.random() * 20) + 1;
    return baseRoll + (this.attributes[attributeName] || 0);
  }

  /**
   * Spends one attribute point and increments a specific attribute by 1.
   *
   * @param {string} attributeName - Name of the attribute to increment.
   */
  spendAttributePoint(attributeName) {
    if (this.attributePoints > 0) {
      this.attributes[attributeName] = (this.attributes[attributeName] || 0) + 1;
      this.attributePoints--;
    }
  }

  /**
   * Serializes the character data into a JSON string.
   *
   * @returns {string} The JSON representation of the character.
   */
  serialize() {
    return JSON.stringify({
      name: this.name,
      attributes: this.attributes,
      hitPoints: this.hitPoints,
      role: this.role,
      xp: this.xp,
      level: this.level,
      attributePoints: this.attributePoints,
    });
  }

  /**
   * Deserializes JSON data to create a new CharacterSheet instance.
   *
   * @param {string} json - The JSON string to parse.
   * @returns {CharacterSheet} A newly created CharacterSheet object.
   */
  static deserialize(json) {
    const data = JSON.parse(json);
    const { name, attributes, role } = data;
    const character = new CharacterSheet(
      name,
      attributes.Strength,
      attributes.Dexterity,
      attributes.Constitution,
      attributes.Intelligence,
      attributes.Wisdom,
      attributes.Charisma,
      role
    );
    character.hitPoints = data.hitPoints;
    character.xp = data.xp;
    character.level = data.level;
    character.attributePoints = data.attributePoints;
    return character;
  }

  /**
   * Saves the character data to a file as JSON.
   *
   * @param {string} filePath - The location to save the file.
   * @returns {Promise<void>}
   */
  async saveToFile(filePath) {
    const json = this.serialize();
    await fs.writeFile(filePath, json, 'utf8');
  }

  /**
   * Reads character data from a file and creates a CharacterSheet instance.
   *
   * @param {string} filePath - The location of the file to read.
   * @returns {Promise<CharacterSheet>} A CharacterSheet instance from the file data.
   */
  static async loadFromFile(filePath) {
    const json = await fs.readFile(filePath, 'utf8');
    return CharacterSheet.deserialize(json);
  }

  /**
   * Builds a decorated message listing the character's attributes and stats.
   *
   * @returns {string} A formatted string with character stats.
   */
  generateStatsMessage() {
    let decoration;
    switch (this.role) {
      case 'Warrior':
        decoration = '<{}>!';
        break;
      case 'Mage':
        decoration = '<>.<>';
        break;
      case 'Rogue':
        decoration = '####';
        break;
      default:
        decoration = '%%%%';
        break;
    }

    const stats = Object.entries(this.attributes)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
      .join('\n');

    return `${decoration}${decoration}${decoration}${decoration}${decoration}${decoration}${decoration}\n${decoration}     Character Stats     ${decoration}\n${decoration}       ----------        ${decoration}\n${decoration}      Name: ${this.name}         ${decoration}\n${decoration}      Role: ${this.role}      ${decoration}\n${decoration}      Hit Points: ${this.hitPoints}     ${decoration}\n${decoration}      Strength: ${this.attributes.Strength}       ${decoration}\n${decoration}      Dexterity: ${this.attributes.Dexterity}      ${decoration}\n${decoration}      Constitution: ${this.attributes.Constitution}   ${decoration}\n${decoration}      Intelligence: ${this.attributes.Intelligence}   ${decoration}\n${decoration}      Wisdom: ${this.attributes.Wisdom}          ${decoration}\n${decoration}      Charisma: ${this.attributes.Charisma}       ${decoration}\n${decoration}${decoration}${decoration}${decoration}${decoration}${decoration}${decoration}\n`;
  }
}

export default CharacterSheet;
