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

  deleteIngredient(id: number) {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      console.log("Delete request got processed.")
    });
  }
}