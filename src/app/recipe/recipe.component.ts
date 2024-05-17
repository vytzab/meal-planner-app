import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from './recipe.service';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient/ingredient.service';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {
  id: string = ''
  recipeItem!: Recipe
  ingredients: Ingredient[] = [];

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.recipeService.getRecipe(parseInt(id))?.subscribe(recipe => {
        if (recipe) {
          this.recipeItem = recipe;
        }
      })
    }
  }

  getIngredientName(id: number): string | undefined {
    const ingredient = this.ingredients.find(ingredient => ingredient.id === id);
    return ingredient?.name;
  }
}