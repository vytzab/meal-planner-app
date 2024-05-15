import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IngredientService } from '../ingredient/ingredient.service';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.css'
})
export class IngredientFormComponent implements OnInit {
  ingredientForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private ingredientService: IngredientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      protein: ['', Validators.required],
      carbs: ['', Validators.required],
      fat: ['', Validators.required],
      kcal: ['', Validators.required],
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.ingredientService.getIngredient(parseInt(id))?.subscribe(ingredient => {
        if (ingredient)
          this.ingredientForm.patchValue(ingredient);
      })
    }
  }

  onSubmit() {
    if (this.ingredientForm.valid) {
      let ingredient: Ingredient = this.ingredientForm.value;
      console.log(ingredient);

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        this.ingredientService.updateIngredient(ingredient).subscribe(() => {
          console.log("Ingredient updated.")
        });
      } else {
        this.ingredientService.addIngredient(ingredient).subscribe(() => {
          console.log("Ingredient created.")
        });
      }
      this.router.navigate(['/ingredient/list']);
    }
  }
}