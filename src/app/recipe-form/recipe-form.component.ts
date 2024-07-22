import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from '../recipe/recipe.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { RecipeIngredient } from '../models/recipe-ingredient';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup = new FormGroup({});
  id: string = ''
  recipe: Recipe | null = null;
  ingredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  recipeIngredients: RecipeIngredient[] = [];
  recipeIngredient!: RecipeIngredient
  selectedId: number = 0

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients
      this.filteredIngredients = ingredients;
    });

    this.recipeForm = this.formBuilder.group({
      name: [''],
      description: [''],
      allIngredients: [''],
      amount: [''],
      recipeIngredients: [''],
      preparationTime: [''],
      cookingTime: [''],
      totalTime: [''],
      instructions: [''],
      servings: [''],
      difficultyLevel: [''],
      image: ['']
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.recipeService.getRecipe(parseInt(id))?.subscribe(recipe => {
        if (recipe) {
          this.recipeForm.patchValue(recipe);
          this.recipe = recipe;
          this.patchRecipeIngredients(recipe.ingredients);
        }
      })
    }
  }

  patchRecipeIngredients(ingredients: RecipeIngredient[]): void {
    ingredients.forEach(ingredient => {
      if (this.checkIngredientExists(ingredient.ingredientId)) {
        const existingIngredientIndex = this.recipeIngredients.findIndex(
          existingIngredient => existingIngredient.ingredientId === ingredient.ingredientId
        );
        this.recipeIngredients[existingIngredientIndex].amount += ingredient.amount;
      } else {
        const newRecipeIngredient: RecipeIngredient = {
          ingredientId: ingredient.ingredientId,
          amount: ingredient.amount
        };

        this.recipeIngredients.push(newRecipeIngredient);
      }
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      let recipe: Recipe = this.recipeForm.value;
      console.log(recipe);

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        this.recipeService.updateRecipe(recipe).subscribe(() => {
          console.log("Recipe updated.")
        });
      } else {
        this.recipeService.addRecipe(recipe).subscribe(() => {
          console.log("Recipe created.")
        });
      }
      this.router.navigate(['/recipe/list']);

      // this.recipeItem = {
      //   name: this.recipeForm.value.name,
      //   description: this.recipeForm.value.description,
      //   ingredients: this.recipeIngredients,
      //   preparationTime: this.recipeForm.value.preparationTime,
      //   cookingTime: this.recipeForm.value.cookingTime,
      //   totalTime: this.recipeForm.value.totalTime,
      //   instructions: this.recipeForm.value.instructions,
      //   servings: this.recipeForm.value.servings,
      //   difficultyLevel: this.recipeForm.value.difficultyLevel,
      //   image: this.recipeForm.value.image
      // };
      // const recipeJson = JSON.stringify(this.recipeItem);
      // console.log(recipeJson);
      // console.log(this.recipeItem);
    // }
    }
  }

  getIngredientName(id: number): string | undefined {
    const ingredient = this.ingredients.find(ingredient => ingredient.id === id);
    return ingredient?.name;
  }

  addIngredientToRecipe() {
    const newIngredientId = this.recipeForm.value.allIngredients;
    const newAmount = this.recipeForm.value.amount;
    if (this.checkIngredientExists(newIngredientId)) {
      const existingIngredientIndex = this.recipeIngredients.findIndex(ingredient => ingredient.ingredientId === newIngredientId);
      this.recipeIngredients[existingIngredientIndex].amount += newAmount;
    } else {
      const newRecipeIngredient: RecipeIngredient = {
        ingredientId: this.recipeForm.value.allIngredients,
        amount: this.recipeForm.value.amount
      };

      this.recipeIngredients.push(newRecipeIngredient);
    }
  }

  removeSelectedIngredients() {
    const selectedIds = this.recipeForm.value.recipeIngredients;
    this.recipeIngredients = this.recipeIngredients.filter(ingredient => !selectedIds.includes(ingredient.ingredientId));
    this.recipeForm.get('recipeIngredients')?.patchValue([]);
  }

  checkIngredientExists(ingredientId: number): boolean {
    return this.recipeIngredients.some(ingredient => ingredient.ingredientId === ingredientId);
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredIngredients = this.ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm)
    )
  }
}
