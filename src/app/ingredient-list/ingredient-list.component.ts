import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { IngredientService } from '../ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients
    });
  }

  deleteIngredient(id: number) {
    this.ingredientService.deleteIngredient(id).subscribe(() => {
      console.log("Delete request got processed.")
    });
  }
}