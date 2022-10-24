
// ========== forEach ========================================//
function printArrayDetails(list) {
    if (list.height > 1.5) {
        document.write(`${list.name} (height: ${list.height}) - Wow, that’s big!`);
    } else {
        document.write(`${list.name} (height: ${list.height})`);
    }
    document.write('<br>')
}

// pokemonList.forEach(printArrayDetails)

// ========== IIFE ========================================//
let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
        { name: 'Charmander', height: 0.6, type: 'fire' },
        { name: 'Squirtle', height: 0.5, type: 'water' },
        { name: 'Caterpie', height: 0.3, type: 'bug' },
        { name: 'Weedle', height: 0.3, type: ['bug', 'poison'] },
        { name: 'Pidgey', height: 0.3, type: ['flying', 'normal'] },
        { name: 'Rattata', height: 0.3, type: 'normal' },
        { name: 'Spearow', height: 0.3, type: ['flying', 'normal'] },
        { name: 'Ekans', height: 2, type: 'poison' },
        { name: 'Pikachu', height: 0.4, type: 'eletric' }
    ];


    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            Object.keys(pokemon).includes('name') &&
            Object.keys(pokemon).includes('height') &&
            Object.keys(pokemon).includes('type')) {
            pokemonList.push(pokemon);
        } else {
            console.log('Not valid Pokemon', pokemon)
        }
    }

    return {
        getAll: getAll,
        add: add
    }
})();

pokemonRepository.add({ name: 'Sandshrew', height: 0.6, type: 'ground' });
pokemonRepository.add({ nawme: 'Sandshrew', height: 0.6, type: 'ground' });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(printArrayDetails);