import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeFormComponent
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
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    RecipeComponent
  ]
})
export class RecipeModule { }
