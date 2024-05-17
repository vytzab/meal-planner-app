import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientComponent } from './ingredient.component';
import { IngredientListComponent } from '../ingredient-list/ingredient-list.component';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    IngredientComponent,
    IngredientListComponent,
    IngredientFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    IngredientComponent
  ]
})
export class IngredientModule { }
