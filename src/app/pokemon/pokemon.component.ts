import { Component, ElementRef, ViewChild } from '@angular/core';
import { PokemonApiService } from '../api/pokemon.api.service';
import { CommonModule } from '@angular/common';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

declare let $: any;

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    PokemonDetailsComponent
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {

  @ViewChild('pokemonUI', { static: false }) public uiElement!: ElementRef;

  offset = 0;
  limit = 4;
  load_pokemon_list = true;
  pokemon_list: any[] = [];
  total = 0;
  pokemon_to_view_more: any;

  constructor(
    private pokemonApiService: PokemonApiService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  /**
   * The `getData` function loads a list of Pokémon from an API, processes the data, and triggers
   * loading of additional details for each Pokémon.
   */
  getData() {
    this.load_pokemon_list = true;
    this.pokemonApiService.getPokemonList({ limit: this.limit, offset: this.offset }).subscribe({
      next: (res: any) => {
        this.total = res.count;
        try {
          const new_data = res.results.map((e: any) => ({
            ...e,
            load_details: true,
            image_loading: true
          }))
          const start_ind = this.pokemon_list.length;
          const end_ind = start_ind + this.limit
          this.pokemon_list = this.pokemon_list.concat(new_data)
          for (let i = start_ind; i < end_ind; i++) {
            this.getSinglePokemonDetails(this.pokemon_list[i].url, i)
          }
        } catch { }
        this.load_pokemon_list = false;
        setTimeout(() => this.onScrollLoadData())
      },
      error: () => {
        this.load_pokemon_list = false
      }
    })
  }

  /**
   * The function `getSinglePokemonDetails` retrieves details of a single Pokemon from a given URL and
   * updates the corresponding item in a list.
   * @param {string} url - The `url` parameter in the `getSinglePokemonDetails` function is a string
   * that represents the URL from which data about a specific Pokemon is fetched.
   * @param {number} update_index - The `update_index` parameter in the `getSinglePokemonDetails`
   * function is used to specify the index of the item in the `pokemon_list` array that needs to be
   * updated with the details fetched from the API response.
   */
  getSinglePokemonDetails(url: string, update_index: number): void {
    this.pokemonApiService.getDataOnUrl(url).subscribe({
      next: (res: any) => {
        const ele_item: any = this.pokemon_list[update_index];
        ele_item.load_details = false;
        ele_item.data = { ...res };
      },
      error: () => {
        this.pokemon_list[update_index].load_details = false;
      }
    })
  }

  /**
   * The function `onScrollLoadData` is triggered when the user scrolls to the bottom of the element,
   * checks if more data needs to be loaded, and then fetches the data if necessary.
   */
  public async onScrollLoadData() {
    const nativeElement = this.uiElement.nativeElement
    if ((nativeElement.clientHeight + Math.round(nativeElement.scrollTop) === nativeElement.scrollHeight) && !this.load_pokemon_list && (this.total !== this.pokemon_list.length)) {
      this.offset += this.limit
      this.getData()
    }
  }

  /**
   * The function `openViewDetails` copies the selected Pokemon object and displays more details in an
   * offcanvas element.
   * @param {any} selected - The `selected` parameter in the `openViewDetails` function likely refers
   * to the data of a specific Pokemon that the user has selected to view more details about. This data
   * could include information such as the Pokemon's name, type, abilities, stats, and other relevant
   * details. The function then copies
   */
  openViewDetails(selected: any) {
    this.pokemon_to_view_more = { ...selected }
    $("#viewPokemonDetails").offcanvas("show")
  }

}
