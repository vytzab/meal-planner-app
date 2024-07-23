import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = "http://192.168.1.167:9098/recipe"

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

  getRecipesByMealType(isBreakfast: boolean, isLunch: boolean, isDinner: boolean): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/getRecipesByMealType`, {
      params: {
        isBreakfast: isBreakfast.toString(),
        isLunch: isLunch.toString(),
        isDinner: isDinner.toString()
      }
    });
  }

  getRandomRecipe(isBreakfast: boolean, isLunch: boolean, isDinner: boolean): Observable<Recipe> {
    return new Observable<Recipe>(observer => {
      this.getRecipesByMealType(isBreakfast, isLunch, isDinner).subscribe(recipes => {
        if (recipes.length > 0) {
          const randomIndex = Math.floor(Math.random() * recipes.length);
          observer.next(recipes[randomIndex]);
          observer.complete();
        } else {
          observer.next(null);
          observer.complete();
        }
      });
    });
  }
}
