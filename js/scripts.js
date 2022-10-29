
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
        button.innerText = upperCaseFirst(pokemon.name);
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
            showModal(pokemon);
        });
    }

    // =========== LOADING MESSAGE ============================================
    function showLoadingMessage() {
        let loadingMessageContainer = document.querySelector('#loading-message');

        // Clear all existing modal content
        loadingMessageContainer.innerHTML = '';

        let message = document.createElement('div');
        message.classList.add('message');

        let titleElement = document.createElement('h1');
        titleElement.innerText = 'Wait!';

        let contentElement = document.createElement('p');
        contentElement.innerText = 'The data is being loaded';

        message.appendChild(titleElement);
        message.appendChild(contentElement);
        loadingMessageContainer.appendChild(message);

        loadingMessageContainer.classList.add('is-visible');
    }

    function hideLoadingMessage() {
        let loadingMessageContainer = document.querySelector('#loading-message');
        loadingMessageContainer.classList.remove('is-visible');
    }

    // ========== POKEMON EXIBITION ==============================================
    let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {

        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add modal close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonTitle = document.createElement('h1');
        pokemonTitle.innerText = upperCaseFirst(pokemon.name);

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + formattedHeight(pokemon.height);

        let pokemonTypes = document.createElement('p');
        pokemonTypes.innerText = 'Type: ' + pokemon.types.map(item => upperCaseFirst(item.type.name)).join(', ');

        let pokemonImage = document.createElement("img");
        pokemonImage.setAttribute("src", pokemon.imageUrl);
        pokemonImage.setAttribute("class", "pokemonImage");
        pokemonImage.setAttribute("float", "left");
        pokemonImage.setAttribute("alt", "Pokemon image");

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonTitle);
        modal.appendChild(pokemonImage);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes)
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    function upperCaseFirst(word) {
        let upperCased = word.charAt(0).toUpperCase() + word.slice(1);
        return upperCased;
    }

    function formattedHeight(height) {
        const heigthStr = height.toString();
        if (height <= 9) {
            return heigthStr + '0 cm';
        } else {
            return heigthStr.charAt(0) + '.' + heigthStr.slice(1) + ' m';
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });



    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    }
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
});

