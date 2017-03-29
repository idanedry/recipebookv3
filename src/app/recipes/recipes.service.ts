import { Injectable ,OnDestroy } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import { AngularFire ,FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs'
// import { AuthService } from '../auth/auth.service';

@Injectable()
export class RecipeService implements OnDestroy {
  // recipes : Recipe[] = [];
  recipes : FirebaseListObservable<Recipe[]> ;
  recipeLength : number;
  subscription : Subscription;
  recipesArray : Recipe[];
  selected ;

  constructor(private af: AngularFire,
              // private authService : AuthService
               ) {
  }

  // private recipes : FirebaseListObservable<Recipe[]> = this.af.database.list('/recipes');
  // private recipes: Recipe[] = [
  //   new Recipe('Pizza', 'Very tasty', '../assets/pizza.jpg', [ 
  //   	new Ingredient('Tomato', 3),
  //   	new Ingredient('Cheese', 1),
  //   	new Ingredient('Olives', 5),
  //   	]),
  //   new Recipe('Summer Salad', 'Okayish', '../assets/salad.jpg',[
  //   	new Ingredient('Tomato', 2),
  //   	new Ingredient('Cucumber', 1)
  //   	])
  // ];

  // private shoppingCart: Ingredient[] = [
  //   new Ingredient('Cheese',2),
  //   new Ingredient('Olives',1)
  // ];
  private shoppingCart : FirebaseListObservable<Ingredient[]> ;

  getRecipes(){
    return this.af.database.list('/recipes')
        .map(res => this.recipes = res)
  }

  getRecipe(id){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe){
    // console.log(this.authService.)
    this.af.database.list('/recipes').push(recipe);
  }

  editRecipe(oldRecipe, newRecipe: Recipe){
    this.af.database.object('/recipes/' + oldRecipe.$key).set(newRecipe);
  }

  deleteRecipe(recipe  ){
    this.af.database.object('/recipes/' + recipe.$key).set(null);
  }

  getShoppingCart(){
    return this.af.database.list('/shoppingCart');
  }

  addToShoppingCart(item: Ingredient){
    this.af.database.list('/shoppingCart').push(item);
  }

  deleteShoppingCart(){
    this.af.database.object('/shoppingCart').set(null);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
