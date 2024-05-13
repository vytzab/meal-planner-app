import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientComponent } from './ingredient.component';
import { IngredientListComponent } from '../ingredient-list/ingredient-list.component';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';



@NgModule({
  declarations: [
    IngredientComponent,
    IngredientListComponent,
    IngredientFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IngredientComponent
  ]
})
export class IngredientModule { }
