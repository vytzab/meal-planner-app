import { Component, OnInit } from '@angular/core';
import { WeekplanService } from './weekplan.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe/recipe.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Weekplan } from '../models/weekplan';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { ShoppingListItem } from '../models/shopping-list-item';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-weekplan',
  templateUrl: './weekplan.component.html',
  styleUrl: './weekplan.component.css'
})
export class WeekplanComponent implements OnInit {
  id: string = ''
  weekPlanItem!: Weekplan
  recipes: Recipe[] = [];
  mealsByDay: { [day: number]: { [type: number]: Recipe | null } } = {};
  recipeItem: Recipe | null = null;
  shoppingList: ShoppingListItem[] = [];

  constructor(
    private weekplanService: WeekplanService,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.initializeMealsByDay();
        this.fetchWeekPlan();
      },
      error: (err) => console.error('Failed to fetch recipes:', err),
      complete: () => console.log('Recipe fetch complete')
    });
  }

  fetchWeekPlan(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.weekplanService.getWeekplan(parseInt(id)).subscribe({
        next: (weekplan) => {
          if (weekplan) {
            this.weekPlanItem = weekplan;
            this.mapMealsToDays();
          } else {
            console.error('Weekplan not found.');
          }
        },
        error: (err) => console.error('Failed to fetch weekplan:', err),
        complete: () => console.log('Weekplan fetch complete.')
      });
    }
  }

  initializeMealsByDay(): void {
    for (let i = 1; i <= 7; i++) {
      this.mealsByDay[i] = { 1: null, 2: null, 3: null };
    }
  }

  mapMealsToDays(): void {
    for (let meal of this.weekPlanItem.meals) {
      const day = meal.day;
      const type = meal.type;
      const recipe = this.recipes.find(r => r.id === meal.recipeId);

      if (recipe) {
        this.mealsByDay[day][type] = recipe;
      } else {
        console.warn(`Recipe not found for recipeId: ${meal.recipeId}`);
      }
    }
    this.generateShoppingList();
  }

  getSpecificMeal(day: number, type: number): Recipe | null {
    return this.mealsByDay[day][type] || null;
  }

  generateShoppingList(): void {
    this.shoppingList = [];
    const ingredientMap: { [id: number]: number } = {};
    const ingredientIds: number[] = [];

    for (let day = 1; day <= 7; day++) {
      for (let type = 1; type <= 3; type++) {
        const recipe = this.getSpecificMeal(day, type);
        if (recipe) {
          for (let recipeIngredient of recipe.ingredients) {
            if (ingredientMap[recipeIngredient.ingredientId]) {
              ingredientMap[recipeIngredient.ingredientId] += recipeIngredient.amount;
            } else {
              ingredientMap[recipeIngredient.ingredientId] = recipeIngredient.amount;
              ingredientIds.push(recipeIngredient.ingredientId);
            }
          }
        }
      }
    }

    forkJoin(
      ingredientIds.map(id => this.ingredientService.getIngredient(id))).subscribe({
        next: (ingredients) => {
          for (let ingredient of ingredients) {
            const amount = ingredientMap[ingredient.id];
            if (amount !== undefined) {
              this.shoppingList.push({ ingredient, amount });
            }
          }
          console.log('Generated shopping list:', this.shoppingList);
        },
        error: (err) => console.error('Failed to fetch ingredients:', err),
        complete: () => console.log('Ingredient fetch complete for shopping list.')
      });
  }

  randomizeRecipe(day: number, type: number): void {
    let isBreakfast = false;
    let isLunch = false;
    let isDinner = false;

    switch (type) {
      case 1:
        isBreakfast = true;
        break;
      case 2:
        isLunch = true;
        break;
      case 3:
        isDinner = true;
        break;
      default:
        return;
    }

    this.recipeService.getRandomRecipe(isBreakfast, isLunch, isDinner).subscribe(recipe => {
        if (recipe) {
          this.recipeItem = recipe;

          const mealToUpdate = this.weekPlanItem.meals.find(meal => meal.day === day && meal.type === type);
          if (mealToUpdate) {
            mealToUpdate.recipeId = this.recipeItem.id;
            this.mealsByDay[day][type] = this.recipeItem;

            this.updateWeekplan(this.weekPlanItem).subscribe(() => {
              this.generateShoppingList();
            });
          } else {
            console.error(`Meal not found for day ${day} and type ${type}`);
          }
        } else {
          console.error('No recipe found for the specified meal type');
        }
      });
  }

  updateWeekplan(updatedWeekPlan: Weekplan): Observable<void> {
    return this.weekplanService.updateWeekplan(updatedWeekPlan).pipe(
      tap(() => {
        console.log('Week plan updated successfully.');
      })
    );
  }

  randomizeAllMeals(): void {
    for (let day = 1; day <= 7; day++) {
      for (let type = 1; type <= 3; type++) {
        this.randomizeRecipe(day, type);
      }
    }
  }

  getMealTypeName(type: number): string {
    switch (type) {
      case 1:
        return 'Breakfast';
      case 2:
        return 'Lunch';
      case 3:
        return 'Dinner';
      default:
        return '';
    }
  }

  getDayName(type: number): string {
    switch (type) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      case 7:
        return 'Sunday';
      default:
        return '';
    }
  }
}