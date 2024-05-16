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

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes
    });
  }

  deleteIngredient(id: number | undefined): void {
  if (id !== undefined) {
    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        console.log("Ingredient deleted successfully.");
      },
      error: (error) => {
        console.error("Error deleting ingredient:", error);
      }
    });
  } else {
    console.error("Cannot delete ingredient without a valid ID");
  }
}

  // deleteIngredient(id: number) {
  //   this.recipeService.deleteRecipe(id).subscribe(() => {
  //     console.log("Delete request got processed.")
  //   });
  // }
}