import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientComponent } from './ingredient/ingredient.component';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"ingredient", component: IngredientComponent},
  {path:"ingredient/new", component: IngredientFormComponent},
  {path:"recipe", component: RecipeComponent},
  {path:"recipe/new", component: RecipeFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }