import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipes.service';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { AuthService } from '../../auth/auth.service';
import { Subject} from 'rxjs/Subject';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  private getRecipesSubscription : Subscription;
  private loadingArraySubscription : Subscription;
  private loadingArray = new Subject();
  recipes;
  private fakeRecipes = [];	
  private isLoading : boolean = true ;
  
  constructor( private _recipeService: RecipeService,
  			   private af: AngularFire,
           private _authService : AuthService) {}

  ngOnInit() {
    for(let  i = 0; i < 4 ; i++) {
      setTimeout(()=> { 
        this.loadingArray.next(i)
      },800 * i )
    }

    this.loadingArraySubscription = this.loadingArray.subscribe( res => {
      this.fakeRecipes.push(res)
    });

  	this.getRecipesSubscription = this._recipeService.getRecipes()
      .subscribe( recipes => {
         this.recipes = recipes;
         this.isLoading = false;
       });
  }

  ngOnDestroy(){
    this.getRecipesSubscription.unsubscribe();
    this.loadingArraySubscription.unsubscribe();
  }

}
