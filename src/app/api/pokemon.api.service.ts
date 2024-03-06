import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class PokemonApiService {
    constructor(
        private http: HttpClient
    ) { }

    getPokemonList(params: any) {
        return this.http.get("https://pokeapi.co/api/v2/pokemon", {
            params
        })
    }

    getPokemonDetails(id: string | number) {
        return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    }

    getDataOnUrl(url: string, params?: any) {
        return this.http.get(url, {
            params: params ? { ...params } : {}
        })
    }
}