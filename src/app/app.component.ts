import { Component , ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import { RecipeService} from './recipes/recipes.service'
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Subscription } from 'rxjs/Rx';
import { ContextMenuService } from 'angular2-contextmenu';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
	private cart;
	subscription : Subscription;
	result;
	private cartLength;

	constructor(private _recipeService: RecipeService, 
			overlay: Overlay, 
			vcRef: ViewContainerRef,
			public modal: Modal,
			public toastr: ToastsManager,
			private contextMenuService: ContextMenuService
			 ) {
		overlay.defaultViewContainer = vcRef;
		this.toastr.setRootViewContainerRef(vcRef);
	}

	ngOnInit(){
		this.subscription = this._recipeService.getShoppingCart()
			.subscribe(res => {
				this.cart = res;
				this.cartLength = res.length;

			});

	}

	onShoppingCart() {
		console.log("clicked!");
		let test = '';
		for(let i = 0 ; i < this.cart.length ; i ++) {
			test += '<li class="list-group">' + this.cart[i].name + ' - ' + this.cart[i].amount + '</li>';
		}
		console.log(test);
		this.modal.alert()
		    .size('sm')
		    .isBlocking(false)
		    .showClose(true)
		    .keyboard(27)
		    .title('To Buy')
		    .body(test)
		    .open();
	}

	ngOnDestroy(){
		console.log("on destroy")
		this.subscription.unsubscribe();
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

	onClearShoppingCart(){
		const dialog = this.confirmCheck();
		dialog.then((resultPromise) => {
            return resultPromise.result.then((result) => {
                this._recipeService.deleteShoppingCart();
                this.toastr.info('Shopping List Cleared!')
                this.result = true;
            },
            () =>  this.result = false);
	    });
	}

	public onContextMenu($event: MouseEvent, item: any): void {
	    this.contextMenuService.show.next({
	      actions: [
	        {
	          html: () => `Clear Shopping List`,
	          click: () => this.onClearShoppingCart()
	        }
	      ],
	      event: $event,
	      item: item,
	    });
	    $event.preventDefault();
	    $event.stopPropagation();
  }

}
