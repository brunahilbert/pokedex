
// ========== forEach ========================================//
// function printArrayDetails(list) {
//     if (list.height > 1.5) {
//         document.write(`${list.name} (height: ${list.height}) - Wow, that’s big!`);
//     } else {
//         document.write(`${list.name} (height: ${list.height})`);
//     }
//     document.write('<br>')
// }

// pokemonList.forEach(printArrayDetails)

// ========== IIFE ========================================//
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            Object.keys(pokemon).includes('name') &&
            Object.keys(pokemon).includes('detailsUrl')) {
            pokemonList.push(pokemon);
        } else {
            console.log('Not valid Pokemon', pokemon)
        }
    }

    function addListItem(pokemon) {
        let unorderedList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.classList.add('button-class');
        listItem.appendChild(button);
        unorderedList.appendChild(listItem);

        buttonOnClick(button, pokemon);
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    // Added Event Listner to 'button'
    function buttonOnClick(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function showLoadingMessage() {
        let popup = document.querySelector('.popup');
        popup.classList.add('.popup.is-visible');
    }

    function hideLoadingMessage() {
        let popup = document.querySelector('.popup');
        popup.classList.remove('.popup.is-visible');
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    }
})();

// pokemonRepository.add({ name: 'Sandshrew', height: 0.6, type: 'ground' });
// pokemonRepository.add({ nawme: 'Sandshrew', height: 0.6, type: 'ground' });

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
});

