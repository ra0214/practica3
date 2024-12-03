import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemons: Pokemon[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private pokemonService: PokemonService, private router: Router) {} 

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.loading = true;
    this.error = '';

    this.pokemonService.getPokemon().subscribe(
      (pokemonList: Pokemon[]) => {
        this.pokemons = pokemonList; 
        this.loading = false;
      },
      (error) => {
        this.error = 'Error al obtener los datos de Pokémon';
        console.error(error);
        this.loading = false;
      }
    );
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/']);
  }
}