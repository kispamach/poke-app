import './App.css';
import { useState } from "react";
import Axios from 'axios';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "", 
    species: "", 
    img: "", 
    hp: "",
    attack: "",
    defense: "",
    type: "",
  })

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response)=> {
        setPokemon({
          name: response.data.name, 
          species: response.data.species.name, 
          img: response.data.sprites.other.dream_world.front_default, 
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    )
  }

  const inputLower = (event) => {
    event.target.value = event.target.value.toLowerCase()
    setPokemonName(event.target.value)
  }

  return (
    <div className="App">
      <div className='TitleSection'>
        <h1>Pokemon Stats</h1>
        <input 
          type="text" 
          onChange={inputLower}/>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='DisplaySection'>
        {!pokemonChosen ? (
        <h1> Please choose a Pokemon</h1>
        ) : (
          <>
            <h1 className='name'>{pokemon.name}</h1>
            <img src={pokemon.img}/>
            <div className="stat">
              <h3>Species: {pokemon.species}</h3>
              <h3>Type: {pokemon.type}</h3>
              <h4>Hp: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defense: {pokemon.defense}</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
