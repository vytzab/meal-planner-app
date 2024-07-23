import { Component, OnInit } from '@angular/core';
import { WeekplanService } from '../weekplan/weekplan.service';
import { Weekplan } from '../models/weekplan';

@Component({
  selector: 'app-weekplan-list',
  templateUrl: './weekplan-list.component.html',
  styleUrls: ['./weekplan-list.component.css']
})
export class WeekplanListComponent implements OnInit {
  weekplans: Weekplan[] = [];

  constructor(private weekplanService: WeekplanService) { }

  ngOnInit(): void {
    this.fetchWeekplans();
  }

  fetchWeekplans(): void {
    this.weekplanService.getWeekplans().subscribe({
      next: (weekplans) => {
        this.weekplans = weekplans;
        console.log('Weekplans fetched:', this.weekplans);
      },
      error: (err) => console.error('Failed to fetch weekplans:', err),
      complete: () => console.log('Weekplan fetch complete.')
    });
  }
}