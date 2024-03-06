import axios from "axios"; 
import inquirer from "inquirer";
// finds hidden abilities in list of pokemons

const pokemons = ["squirtle", "charmander"];

const url = 'https://pokeapi.co/api/v2/pokemon/';

let look = true;

async function findAbility() {
  for (let i in pokemons) {
    const response = await axios.get(url+pokemons[i]);
    const pokemonData = response.data;
    console.log(pokemonData.abilities[1].ability);
    look = false;
  }
}

async function inputPokemon() {
  const input = await inquirer.prompt({
      name: "pokemon",
      type: 'input',
      default() {
          return 'pokemon';
      },
  }); 
  pokemons.push(input.pokemon)
}
async function menu(){
  const input = await inquirer.prompt({
    name: "go_where",
    type: 'list',
    choices: [
      "inputPokemon",
      "findAbility"
    ]
  })
  if (input.go_where == "inputPokemon") {
    await inputPokemon()
  } else {await findAbility()};
}

while(look){
  await menu()
}