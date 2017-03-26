import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipes.service';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // recipes: Recipe[] = [];
  // recipes: FirebaseListObservable<Recipe[]>;
  recipes;	
  private isLoading : boolean = false ;
  constructor( private _recipeService: RecipeService,
  			   private af: AngularFire) {}

  ngOnInit() {
    // this.recipes = this._recipeService.getRecipes()
    this.isLoading = true;
  	this._recipeService.getRecipes()
      .subscribe( recipes => {
                     this.recipes = recipes;
                     this.isLoading = false;
                   });
  }


}
