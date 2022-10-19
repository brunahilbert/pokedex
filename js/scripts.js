let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, type: 'fire'},
    {name: 'Squirtle', height: 0.5, type: 'water'},
    {name: 'Caterpie', height: 0.3, type: 'bug'},
    {name: 'Weedle', height: 0.3, type: ['bug', 'poison']},
    {name: 'Pidgey', height: 0.3, type: ['flying', 'normal']},
    {name: 'Rattata', height: 0.3, type: 'normal'},
    {name: 'Spearow', height: 0.3, type: ['flying', 'normal']},
    {name: 'Ekans', height: 2, type: 'poison'},
    {name: 'Pikachu', height: 0.4, type: 'eletric'}
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that’s big!`);
    }else {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})`);
    }
    document.write('<br>')
}