import { Component, OnInit, OnDestroy, Input, ViewContainerRef } from '@angular/core';
import { Recipe } from '../recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { Subscription } from 'rxjs/Rx';
import { Ingredient } from '../../shared/ingredient';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';


@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: []
})

export class RecipeDetailComponent implements OnInit,OnDestroy {
  // selectedRecipe : Recipe;
  selectedRecipe ;//: Recipe;
  
  private subscription: Subscription;
  private recipeIndex: number;
  result : boolean;

  constructor( private route: ActivatedRoute,
  			   private _router: Router,
  			   private _recipeService: RecipeService,
           public toastr: ToastsManager,
           vcr: ViewContainerRef,
           ) {
  this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        // this.selectedRecipe = this._recipeService.getRecipe(this.recipeIndex);
        this._recipeService.getRecipes()
          .subscribe(recipes => this.selectedRecipe = recipes[this.recipeIndex])
      }
    );
  }

  onEdit(){
    this._router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }

  onDelete(){
    // this._recipeService.deleteRecipe(this.selectedRecipe);
    this.toastr.error('Deleted')
    // this._router.navigate(['../'])


    // const dialog = this.confirmCheck();
    // dialog.then((resultPromise) => {
    //         return resultPromise.result.then((result) => {
    //             this._recipeService.deleteRecipe(this.selectedRecipe)
    //             this.toastr.error('Deleted');
    //             this.result = true;
    //         },
    //         () =>  this.result = false);
    //   });
  }

  onAddToShoppingCart(item: Ingredient){
    this._recipeService.addToShoppingCart(item);
    this.toastr.success(item.name + ' Added!');
  }

  // confirmCheck(){
  //   return this.modal.confirm()
  //       .size('sm')
  //       .isBlocking(true)
  //       .showClose(true)
  //       .keyboard(27)
  //       // .title('Are you sure?')
  //       .body('Are you sure?')
  //       .open();
  // }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
