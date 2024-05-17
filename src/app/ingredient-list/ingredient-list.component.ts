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
  filteredIngredients: Ingredient[] = [];
  sortOrder: string = ""

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
      this.filteredIngredients = ingredients;
    });
  }

  deleteIngredient(id: number) {
    this.ingredientService.deleteIngredient(id).subscribe(() => {
      console.log("Delete request got processed.")
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredIngredients = this.ingredients.filter(ingredient => 
      ingredient.name.toLowerCase().includes(searchTerm)
    )

    this.sortIngredients(this.sortOrder);
  }

  sortIngredients(sortValue: string) {
    this.sortOrder = sortValue;

    if(this.sortOrder === "kcalLowHigh") {
      this.filteredIngredients.sort((a,b) => a.kcal - b.kcal)
    } else if (this.sortOrder === "kcalHighLow") {
      this.filteredIngredients.sort((a,b) => b.kcal - a.kcal)
    }
  }
}