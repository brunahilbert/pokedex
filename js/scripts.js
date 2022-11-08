// ========== IIFE ========================================//
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      Object.keys(pokemon).includes("name") &&
      Object.keys(pokemon).includes("detailsUrl")
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Not valid Pokemon", pokemon);
    }
  }

  function addListItem(pokemon) {
    let unorderedList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.setAttribute("id", "button-class");
    button.classList.add("btn");
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.innerText = upperCaseFirst(pokemon.name);

    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    buttonOnClick(button, pokemon);
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  // Added Event Listner to 'button'
  function buttonOnClick(button, pokemon) {
    button.addEventListener("click", function () {
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
    let loadingMessageContainer = document.querySelector("#loading-message");

    // Clear all existing modal content
    loadingMessageContainer.innerHTML = "";

    let message = document.createElement("div");
    message.classList.add("message");

    let titleElement = document.createElement("h1");
    titleElement.innerText = "Wait!";

    let contentElement = document.createElement("p");
    contentElement.innerText = "The data is being loaded";

    message.appendChild(titleElement);
    message.appendChild(contentElement);
    loadingMessageContainer.appendChild(message);

    loadingMessageContainer.classList.add("is-visible");
  }

  function hideLoadingMessage() {
    let loadingMessageContainer = document.querySelector("#loading-message");
    loadingMessageContainer.classList.remove("is-visible");
  }

  // ========== POKEMON EXIBITION ==============================================

  function showModal(pokemon) {
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");

    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";

    let pokemonTitle = document.createElement("h1");
    pokemonTitle.innerText = upperCaseFirst(pokemon.name);

    let pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = "Height: " + formattedHeight(pokemon.height);

    let pokemonWeight = document.createElement("p");
    pokemonWeight.innerText = "Weight: " + formattedWeight(pokemon.weight);

    let pokemonTypes = document.createElement("p");
    pokemonTypes.innerText =
      "Type: " +
      pokemon.types.map((item) => upperCaseFirst(item.type.name)).join(", ");

    let pokemonAbilities = document.createElement("p");
    pokemonAbilities.innerText =
      "Abilities: " +
      pokemon.abilities
        .map((item) => upperCaseFirst(item.ability.name))
        .join(", ");

    let pokemonImageFront = document.createElement("img");
    pokemonImageFront.setAttribute("src", pokemon.imageUrlFront);
    pokemonImageFront.setAttribute("class", "modal-img");
    pokemonImageFront.setAttribute("alt", "Pokemon front image");

    let pokemonImageBack = document.createElement("img");
    pokemonImageBack.setAttribute("src", pokemon.imageUrlBack);
    pokemonImageBack.setAttribute("class", "modal-img");
    pokemonImageBack.setAttribute("alt", "Pokemon back image");

    modalTitle.appendChild(pokemonTitle);
    modalBody.appendChild(pokemonImageFront);
    modalBody.appendChild(pokemonImageBack);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonWeight);
    modalBody.appendChild(pokemonTypes);
    modalBody.appendChild(pokemonAbilities);
  }

  function upperCaseFirst(word) {
    let upperCased = word.charAt(0).toUpperCase() + word.slice(1);
    return upperCased;
  }

  function formattedHeight(height) {
    const heigthStr = height.toString();
    if (height <= 9) {
      return heigthStr + "0 cm";
    } else {
      return heigthStr.charAt(0) + "." + heigthStr.slice(1) + " m";
    }
  }

  function formattedWeight(weight) {
    return weight / 10 + " kg";
  }

  // ========== Search Input ========================================//
  $(document).ready(function () {
    $("#search-input").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $(".pokemon-list li").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
});
