import { Ingredient } from "./ingredient";

export interface ShoppingListItem {
  ingredient: Ingredient;
  amount: number | null;
}