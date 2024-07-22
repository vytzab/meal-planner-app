import { RecipeIngredient } from "./recipe-ingredient";

export interface Recipe {
    id?: number
    name: string
    description: string
    ingredients : RecipeIngredient[]
    preparationTime: number
    cookingTime: number
    totalTime: number
    instructions: string
    servings: number
    difficultyLevel: string
    image: string
    totalProtein?: number
    totalCarbs?: number
    totalFat?: number
    totalKcal?: number
    breakfast: boolean; 
    lunch: boolean;     
    dinner: boolean
}