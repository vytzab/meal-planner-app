import { Component, OnInit } from '@angular/core';
import { Weekplan } from '../models/weekplan';
import { WeekplanService } from './weekplan.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-weekplan',
  templateUrl: './weekplan.component.html',
  styleUrl: './weekplan.component.css'
})
export class WeekplanComponent implements OnInit {
  id: string = ''
  weekPlanItem!: Weekplan
  recipes: Recipe[] = [];
  mealsByDay: { [day: number]: { [type: number]: Recipe } } = {};
  recipeItem: Recipe;

  constructor(
    private weekplanService: WeekplanService,
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      console.log('Recipes fetched:', recipes);
      this.recipes = recipes;
      this.initializeMealsByDay();
      this.fetchWeekPlan();
    });
  }

  fetchWeekPlan(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.weekplanService.getWeekplan(parseInt(id))?.subscribe(weekplan => {
        if (weekplan) {
          this.weekPlanItem = weekplan;
          this.mapMealsToDays();
        }
      });
    }
  }

  initializeMealsByDay(): void {
    for (let i = 1; i <= 7; i++) {
      this.mealsByDay[i] = { 1: null, 2: null, 3: null }; // Initialize each type to null
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
  }

  getSpecificMeal(day: number, type: number): Recipe | null {
    return this.mealsByDay[day][type] || null;
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

    // Fetch a random recipe based on meal type
    this.recipeService.getRandomRecipe(isBreakfast, isLunch, isDinner)
      .subscribe(recipe => {
        if (recipe) {
          // Update the fetched recipe
          this.recipeItem = recipe;

          // Find and update the meal in weekPlanItem.meals
          const mealToUpdate = this.weekPlanItem.meals.find(meal => meal.day === day && meal.type === type);
          if (mealToUpdate) {
            mealToUpdate.recipeId = this.recipeItem.id; // Update the recipeId of the meal
            // Optionally update other properties of the meal if needed

            // Update mealsByDay if necessary
            this.mealsByDay[day][type] = this.recipeItem;

            // Call updateWeekplan to save the updated weekPlanItem
            this.updateWeekplan(this.weekPlanItem);
          } else {
            console.error(`Meal not found for day ${day} and type ${type}`);
          }
        } else {
          console.error('No recipe found for the specified meal type');
        }
      });
  }

  updateWeekplan(updatedWeekPlan: Weekplan): void {
    this.weekplanService.updateWeekplan(updatedWeekPlan).subscribe(() => {
      console.log('Week plan updated successfully.');
    });
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