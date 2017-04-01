import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes.service';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../auth/auth.service';
import { Subject} from 'rxjs/Subject';
import { Subscription } from 'rxjs/Rx';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/animations';


@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['recipe-list.component.css'],
  animations : [
     trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(200px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateY(400px)',
          opacity: 0
        }))
      ])
    ])   
  ]
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

    this.loadingArraySubscription = this.loadingArray
      .subscribe( res => {
        this.fakeRecipes.push(res);
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
