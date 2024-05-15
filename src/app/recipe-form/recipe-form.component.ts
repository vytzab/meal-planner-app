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
  recipeItem!: Recipe
  allIngredients: Ingredient[] = [];
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
      this.allIngredients = ingredients
      console.log(this.allIngredients)
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
      // name: ['', Validators.required],
      // description: ['', Validators.required],
      // ingredients : [''],
      // amount : ['', Validators.required],
      // preparationTime: ['', Validators.required],
      // cookingTime: ['', Validators.required],
      // totalTime: ['', Validators.required],
      // instructions: ['', Validators.required],
      // servings: ['', Validators.required],
      // difficultyLevel: ['', Validators.required],
      // image: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.recipeService.getRecipe(parseInt(id))?.subscribe(recipe => {
        if (recipe) {
          this.recipeForm.patchValue(recipe);
        }
      })
    }
  }

  onSubmit() {

    // if (this.recipeForm.valid) {
    // let recipe: Recipe = this.recipeForm.value;
    // console.log(recipe);

    // let id = this.activatedRoute.snapshot.paramMap.get('id');

    // if (id) {
    //   this.recipeService.updateRecipe(recipe).subscribe(() => {
    //     console.log("Recipe updated.")
    //   });
    // } else {
    //   this.recipeService.addRecipe(recipe).subscribe(() => {
    //     console.log("Recipe created.")
    //   });
    // }
    // this.router.navigate(['/recipe/list']);
    // }
  }

  getIngredientName(id: number): string | undefined {
    const ingredient = this.allIngredients.find(ingredient => ingredient.id === id);
    return ingredient?.name;
  }

  addIngredientToRecipe() {
    const newRecipeIngredient: RecipeIngredient = {
      ingredientId: this.recipeForm.value.allIngredients,
      amount: this.recipeForm.value.amount
    };

    this.recipeIngredients.push(newRecipeIngredient);
  }

  removeSelectedIngredients() {
    const selectedIds = this.recipeForm.value.recipeIngredients;

    this.recipeIngredients = this.recipeIngredients.filter(ingredient => !selectedIds.includes(ingredient.ingredientId));

    this.recipeForm.get('recipeIngredients')?.patchValue([]);
  }
}
