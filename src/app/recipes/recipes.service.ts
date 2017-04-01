import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import { AngularFire ,FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipeService   {
  // recipes : Recipe[] = [];
  recipes : FirebaseListObservable<Recipe[]> ;
  recipeLength : number;
  recipesArray : Recipe[];
  selected ;
  private shoppingCart : FirebaseListObservable<Ingredient[]> ;
  
  constructor(private af: AngularFire,
               ) {
  }

  getRecipes(){
    return this.af.database.list('/recipes')
        .map(res => this.recipes = res)
  }

  getRecipe(id){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe){
    this.af.database.list('/recipes').push(recipe);
  }

  editRecipe(oldRecipe, newRecipe: Recipe){
    this.af.database.object('/recipes/' + oldRecipe.$key).set(newRecipe);
  }

  deleteRecipe(recipe ){
    setTimeout(() => {
      this.af.database.object('/recipes/' + recipe.$key).remove();
    }, 1000)

  }

  getShoppingCart(uid? :string){
    if(uid) {
      return this.af.database.list('/shoppingCart/'+ uid);
    }
    return this.af.database.list('/shoppingCart');
  }

  addToShoppingCart(item: Ingredient, uid? : string){
    if(uid){
      this.af.database.list('/shoppingCart/'+ uid).push(item);
    } else {
      this.af.database.list('/shoppingCart').push(item);  
    }
  }

  deleteShoppingCart(uid?){
    if(uid){
      console.log("what?!")
      this.af.database.object('/shoppingCart/'+ uid).set(null);
    } else {
      this.af.database.object('/shoppingCart').set(null);  
    }
  }


}
