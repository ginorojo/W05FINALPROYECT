// Simulated Database
const pokemons = [
    { id: 1, name: "Bulbasaur", type1: "Grass", type2: "Poison", hp: 45, attack: 49, defense: 49 },
    { id: 4, name: "Charmander", type1: "Fire", type2: null, hp: 39, attack: 52, defense: 43 },
    { id: 7, name: "Squirtle", type1: "Water", type2: null, hp: 44, attack: 48, defense: 65 }
];

const trainers = [
    { id: 1, name: "Ash Ketchum", region: "Kanto", badgeCount: 8, teamPokemonIds: [1, 4, 7] }
];

module.exports = { pokemons, trainers };
