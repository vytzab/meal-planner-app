import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent implements OnInit {
  public id: string = ''

  public ingredientItem!: Ingredient

  constructor(
    private ingredientService: IngredientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.ingredientService.getIngredient(parseInt(id))?.subscribe(ingredient => {
        if (ingredient)
          this.ingredientItem = ingredient;
      })
    }
  }
}
