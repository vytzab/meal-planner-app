import { Injectable } from '@angular/core';
import { Weekplan } from '../models/weekplan';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeekplanService {
  private apiUrl = "http://192.168.1.167:9099/mealplan"

  constructor(
    private http: HttpClient
  ) { }

  getWeekplans(): Observable<Weekplan[]> {
    return this.http.get<Weekplan[]>(this.apiUrl + "/getAllMealPlans");
  }

  getWeekplan(id: number): Observable<Weekplan> | undefined {
    return this.http.get<Weekplan>(this.apiUrl + "/getMealPlan/" + id);
  }

  addWeekplan(weekplan: Weekplan): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/addMealPlan", weekplan)
  }

  updateWeekplan(updatedMealPlan: Weekplan): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/updateMealPlan", updatedMealPlan)
  }

  deleteWeekplan(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/deleteMealPlan/" + id)
  }
}
