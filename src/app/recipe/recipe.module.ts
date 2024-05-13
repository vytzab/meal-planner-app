import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';



@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecipeComponent
  ]
})
export class RecipeModule { }
