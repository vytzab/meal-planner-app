import { WeekplanRecipe } from "./weekplan-recipe";

export interface Weekplan {
    id?: number
    name: string
    week: string
    meals : WeekplanRecipe[]
    shoppingListId? : number
}
