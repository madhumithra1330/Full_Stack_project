const searchInput = document.getElementById("searchInput");
const pokemonContainer = document.getElementById("pokemonContainer");
const message = document.getElementById("message");


// Search Pokémon
async function searchPokemon() {

    const pokemonName = searchInput.value.trim().toLowerCase();

    if (pokemonName === "") {
        message.textContent = "Please enter a Pokémon name!";
        return;
    }

    getPokemon(pokemonName);
}


// Get Pokémon from API
async function getPokemon(name) {

    message.textContent = "Loading...";

    try {

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const data = await response.json();

        displayPokemon(data);

        message.textContent = "";

    } catch (error) {

        pokemonContainer.innerHTML = "";

        message.textContent =
            "❌ Pokémon not found. Try another name.";

    }
}


// Display Pokémon
function displayPokemon(pokemon) {

    const types = pokemon.types
        .map(type => `
            <span class="type">
                ${type.type.name}
            </span>
        `)
        .join("");


    const stats = pokemon.stats
        .map(stat => {

            const percentage = Math.min(
                stat.base_stat,
                100
            );

            return `
                <div class="stat">

                    <div class="stat-name">
                        <span>${stat.stat.name}</span>
                        <strong>${stat.base_stat}</strong>
                    </div>

                    <div class="progress">
                        <div 
                            class="progress-bar"
                            style="width: ${percentage}%"
                        ></div>
                    </div>

                </div>
            `;
        })
        .join("");


    pokemonContainer.innerHTML = `

        <div class="pokemon-card">

            <p class="pokemon-id">
                #${pokemon.id}
            </p>

            <img 
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}"
            >

            <h2>
                ${pokemon.name}
            </h2>

            <div class="types">
                ${types}
            </div>

            <div class="info">

                <div>
                    <strong>Height</strong>
                    <p>${pokemon.height / 10} m</p>
                </div>

                <div>
                    <strong>Weight</strong>
                    <p>${pokemon.weight / 10} kg</p>
                </div>

            </div>

            <div class="stats">

                <h3>Base Stats</h3>

                ${stats}

            </div>

        </div>

    `;
}


// Random Pokémon
async function randomPokemon() {

    const randomId = Math.floor(
        Math.random() * 1025
    ) + 1;

    searchInput.value = "";

    getPokemon(randomId);
}


// Press Enter to search
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchPokemon();
    }

});