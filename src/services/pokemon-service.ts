import Pokemon from "../models/pokemon";
 
export default class PokemonService {
 
  static getPokemons(): Promise<Pokemon[]> {
    return fetch('http://localhost:3001/pokemons')
      .then(response => response.json())
      .catch(error => this.handleError(error));
  }
 
  static getPokemon(id: number): Promise<Pokemon|null> {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error => this.handleError(error));
  }
 
  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
    method: 'PUT', 
    headers: { 'Content-type' : 'application/json' },
    body: JSON.stringify(pokemon)
  })
    .then(Response => Response.json())
    .catch(error => this.handleError(error))
  }
  

static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
  // eslint-disable-next-line
  delete pokemon.created;
  
  return fetch('http://localhost:3001/pokemons', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(pokemon)
  })
  .then(Response => Response.json())
  .catch(error => this.handleError(error))
}

static deletePokemon(pokemon: Pokemon): Promise<Pokemon> {
  return fetch(`http://localhose:3001/pokemons/${pokemon.id}`, {
    method: 'DELETE',
    headers: { 'Content-type:' : 'application/json' },
  })
  .then(response => response.json())
  .catch(error => this.handleError(error))
} 

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}