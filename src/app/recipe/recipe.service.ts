import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = "http://localhost:9097/recipe"

  constructor(
    private http: HttpClient
  ) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl + "/getAllRecipes");
  }

  getRecipe(id: number): Observable<Recipe> | undefined {
    return this.http.get<Recipe>(this.apiUrl + "/getRecipe/" + id);
  }

  addRecipe(recipe: Recipe): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/addRecipe", recipe)
  }

  updateRecipe(updatedRecipe: Recipe): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/updateRecipe", updatedRecipe)
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/deleteRecipe/" + id)
  }
}
