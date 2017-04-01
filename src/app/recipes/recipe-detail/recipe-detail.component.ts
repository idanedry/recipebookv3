import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { Subscription } from 'rxjs/Rx';
import { Ingredient } from '../../shared/ingredient';
import { ToastsManager, Toast} from 'ng2-toastr';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: []
})

export class RecipeDetailComponent implements OnInit,OnDestroy {
  selectedRecipe ;
  
  private subscription: Subscription;
  private getRecipeSubscription: Subscription;
  
  private recipeIndex: number;
  result : boolean;
  private uidMatch: boolean = false;

  constructor( private route: ActivatedRoute,
  			   private _router: Router,
  			   private _recipeService: RecipeService,
           public toastr: ToastsManager,
           public modal: Modal,
           private _authService : AuthService
           ) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        // this.selectedRecipe = this._recipeService.getRecipe(this.recipeIndex);
        this.getRecipeSubscription = this._recipeService.getRecipes()
          .subscribe(recipes => {
              this.selectedRecipe = recipes[this.recipeIndex];
              if ( this.selectedRecipe.uid === this._authService.uid) {
                this.uidMatch = true;
              } else {
                this.uidMatch = false;
              }
          });
      }
    );
  }

  onEdit(){
    this._router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }

  confirmCheck(){
    return this.modal.confirm()
        .size('sm')
        .isBlocking(true)
        .showClose(true)
        .keyboard(27)
        // .title('Are you sure?')
        .body('Are you sure?')
        .open();
  }

  onDelete(){
    const dialog = this.confirmCheck();
    dialog.then((resultPromise) => {
        return resultPromise.result.then((result) => {
            this.toastr.error('Deleted')
                .then( (toast) => {
                      this._recipeService.deleteRecipe(this.selectedRecipe)
                      this._router.navigate(['/recipes'])
                });
            this.result = true;
        },
        () =>  this.result = false);
      });
  }

  onAddToShoppingCart(item: Ingredient){
    if(!this._authService.uid) {
      return
    }
    this._recipeService.addToShoppingCart(item, this._authService.uid);
    this.toastr.success(item.name + ' Added!');
  }

  ngOnDestroy(){
    this.getRecipeSubscription.unsubscribe();
    this.subscription.unsubscribe();
    console.log("on destroy")
  }

  logged(){
    console.log(this._authService.isLoggedIn)
  }

}
