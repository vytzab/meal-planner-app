import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = "http://192.168.1.167:9097/ingredient"

  constructor(
    private http: HttpClient
  ) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl + "/getAllIngredients");
  }

  getIngredient(id: number): Observable<Ingredient> | undefined {
    return this.http.get<Ingredient>(this.apiUrl + "/getIngredient/" + id);
  }

  addIngredient(ingredient: Ingredient): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/addIngredient", ingredient)
  }

  updateIngredient(updatedIngredient: Ingredient): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/updateIngredient", updatedIngredient)
  }

  deleteIngredient(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/deleteIngredient/" + id)
  }
}
