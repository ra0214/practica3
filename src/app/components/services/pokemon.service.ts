import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20'; 

  constructor(private http: HttpClient) {}

  getPokemon(): Observable<Pokemon[]> {
    return this.http.get<{ results: Pokemon[] }>(this.pokemonUrl).pipe(
      switchMap((response) => {
        const pokemonDetails = response.results.map((pokemon) =>
          this.getPokemonDetails(pokemon.url).pipe(
            map((details) => ({
              ...pokemon,
              id: details.id,
              types: details.types.map((typeInfo: any) => typeInfo.type.name),
              abilities: details.abilities.map((abilityInfo: any) => abilityInfo.ability.name),
              height: details.height, 
              weight: details.weight  
            }))
          )
        );
        return forkJoin(pokemonDetails); 
      })
    );
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url); 
  }
}