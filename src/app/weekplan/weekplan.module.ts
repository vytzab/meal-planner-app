import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekplanComponent } from './weekplan.component';
import { WeekplanFormComponent } from '../weekplan-form/weekplan-form.component';
import { WeekplanListComponent } from '../weekplan-list/weekplan-list.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    WeekplanComponent,
    WeekplanFormComponent,
    WeekplanListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    WeekplanComponent
  ]
})
export class WeekplanModule { }
