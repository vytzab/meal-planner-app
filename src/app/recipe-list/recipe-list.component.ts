import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  sortOrder: string = ""

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes
      this.filteredRecipes = recipes;
    });
  }

  deleteRecipe(id: number | undefined): void {
    if (id !== undefined) {
      this.recipeService.deleteRecipe(id).subscribe({
        next: () => {
          console.log("Recipe deleted successfully.");
        },
        error: (error) => {
          console.error("Error deleting recipe:", error);
        }
      });
    } else {
      console.error("Cannot delete recipe without a valid ID");
    }
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredRecipes = this.recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm)
    )

    this.sortRecipes(this.sortOrder);
  }

  sortRecipes(sortValue: string) {
    this.sortOrder = sortValue;

    if(this.sortOrder === "kcalLowHigh") {
      this.filteredRecipes.sort((a,b) => a.totalKcal - b.totalKcal)
    } else if (this.sortOrder === "kcalHighLow") {
      this.filteredRecipes.sort((a,b) => b.totalKcal - a.totalKcal)
    }
  }
}