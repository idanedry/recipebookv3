import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx'
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe';
import { FormArray, FormGroup, FormControl , Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit,OnDestroy {
  private subscription: Subscription; 
  private recipeIndex: number;
  private recipe: Recipe;
  private isNew = true;
  recipeForm: FormGroup
  

  constructor(private _route: ActivatedRoute,
  			  private _recipeService: RecipeService,
  			  private _formBuilder: FormBuilder,
  			  private _router: Router
  			  ) {}

  ngOnInit() {
  	this.subscription = this._route.params.subscribe(
			(params: any) => {
				if (params.hasOwnProperty('id')) {
					this.isNew = false;
					this.recipeIndex = +params['id'];
					this.recipe = this._recipeService.getRecipe(this.recipeIndex);
				} else {
					this.isNew = true;
					this.recipe = null;
				}
				this.initForm();
			} 
  		);
  }

  onSubmit(){
  	const newRecipe = this.recipeForm.value;
  	console.log('new recipe', newRecipe)
  	if(this.isNew){
  		this._recipeService.addRecipe(newRecipe);
  	} else {
  		this._recipeService.editRecipe(this.recipe, newRecipe);
  	}
  	this.navigateBack();
  }

  onCancel(){
  	this.navigateBack();
  }

  onAddItem(name: string, amount: string){
  	(<FormArray>this.recipeForm.controls['ingredients']).push(
  		new FormGroup({
			name: new FormControl(name, Validators.required),
			amount: new FormControl(amount, [
				Validators.required,
				Validators.pattern("\\d+")])
  		}))
  }

  onRemoveItem(index: number){
  	(<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }

  private navigateBack(){
  	this._router.navigate(['../']);
  }

  private initForm(){
  	let recipeName = '';
  	let recipeImageUrl = '';
  	let recipeSteps = '';
  	let recipeIngredients: FormArray = new FormArray([]);

  	if (!this.isNew) {
  		for(let i = 0 ; i < this.recipe.ingredients.length; i ++) {
  			recipeIngredients.push(
  				new FormGroup({
  					name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
  					amount: new FormControl(this.recipe.ingredients[i].amount, [
  						Validators.required,
  						Validators.pattern("\\d+")])
  				})
  			);
  		}
  		recipeName = this.recipe.name;
  		recipeImageUrl = this.recipe.imagePath;
  		recipeSteps = this.recipe.steps;
  	}
	this.recipeForm = this._formBuilder.group({
		name: [recipeName, Validators.required],
		imagePath: [recipeImageUrl, Validators.required],
		steps: [recipeSteps, Validators.required],
		ingredients: recipeIngredients
	});

  }

}