import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekplanComponent } from './weekplan.component';
import { WeekplanFormComponent } from '../weekplan-form/weekplan-form.component';
import { WeekplanListComponent } from '../weekplan-list/weekplan-list.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    WeekplanComponent,
    WeekplanFormComponent,
    WeekplanListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule
  ],
  exports: [
    WeekplanComponent
  ]
})
export class WeekplanModule { }
