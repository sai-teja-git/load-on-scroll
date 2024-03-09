import { CommonModule } from '@angular/common';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "statIcon",
  standalone: true,
})
export class StatIconPipe implements PipeTransform {
  transform(name: any) {
    if (name === "hp") {
      return "fa-solid fa-heart-pulse"
    }
    if (name === "attack") {
      return "fa-solid fa-bolt"
    }
    if (name === "defense") {
      return "fa-solid fa-shield"
    }
    if (name === "special-attack") {
      return "fa-solid fa-house-flood-water-circle-arrow-right"
    }
    if (name === "special-defense") {
      return "fa-solid fa-shield-halved"
    }
    if (name === "speed") {
      return "fa-solid fa-gauge-high"
    }
    return "fa-solid fa-ghost"
  }
}

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    CommonModule,
    StatIconPipe
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {

  @Input() selected_data: any;

}
