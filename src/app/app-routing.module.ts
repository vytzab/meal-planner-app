import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientComponent } from './ingredient/ingredient.component';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { WeekplanComponent } from './weekplan/weekplan.component';
import { WeekplanFormComponent } from './weekplan-form/weekplan-form.component';
import { WeekplanListComponent } from './weekplan-list/weekplan-list.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"ingredient/view/:id", component: IngredientComponent},
  {path:"ingredient/edit/:id", component: IngredientFormComponent},
  {path:"ingredient/new", component: IngredientFormComponent},
  {path:"ingredient/list", component: IngredientListComponent},
  {path:"recipe/view/:id", component: RecipeComponent},
  {path:"recipe/edit/:id", component: RecipeFormComponent},
  {path:"recipe/new", component: RecipeFormComponent},
  {path:"recipe/list", component: RecipeListComponent},
  {path:"weekplan/view/:id", component: WeekplanComponent},
  {path:"weekplan/edit/:id", component: WeekplanFormComponent},
  {path:"weekplan/new", component: WeekplanFormComponent},
  {path:"weekplan/list", component: WeekplanListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }