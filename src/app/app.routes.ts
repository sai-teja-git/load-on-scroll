import { Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';

export const routes: Routes = [
    {
        path: "pokemon-overview",
        component: PokemonComponent
    },
    {
        path: "",
        redirectTo: "pokemon-overview",
        pathMatch: "full"
    },
    {
        path: "**",
        redirectTo: "pokemon-overview",
        pathMatch: "full"
    }
];
