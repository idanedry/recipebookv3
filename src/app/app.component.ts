import { Component , ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import { RecipeService} from './recipes/recipes.service'
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Subscription } from 'rxjs/Rx';
import { ContextMenuService } from 'angular2-contextmenu';
import { ToastsManager, Toast} from 'ng2-toastr';
import { AngularFire } from 'angularfire2';
import { AuthService} from './auth/auth.service';

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
	private cart = [];
	cartSubscription : Subscription;
	authSubscription : Subscription;
	result;
	private cartLength = 0;
	photo : string;
	name : string ;

	constructor(private _recipeService: RecipeService, 
			public overlay: Overlay, 
			public vcRef: ViewContainerRef,
			public modal: Modal,
			public toastr: ToastsManager,
			private contextMenuService: ContextMenuService,
			private af: AngularFire,
			private authService : AuthService,
			 ) {
		overlay.defaultViewContainer = vcRef;
		this.toastr.setRootViewContainerRef(vcRef);
	}

	ngOnInit(){

		this.authSubscription = this.af.auth
			.subscribe(authState => {
				if(!authState) {
					this.photo = null;
					this.name = null;
					this.cart = [];
					this.cartLength = 0;					
					return; 
				}
				this.photo = authState.auth.photoURL;
				this.name = authState.auth.displayName;
				this.cartSubscription = this._recipeService.getShoppingCart(authState.auth.uid)
					.subscribe(res => {
						this.cart = res;
						this.cartLength = res.length;
					});
		});
	}

	onShoppingCart() {
		let test = '';
		for(let i = 0 ; i < this.cart.length ; i ++) {
			test += '<li class="list-group">' + this.cart[i].name + ' - ' + this.cart[i].amount + '</li>';
		}
		this.modal.alert()
		    .size('sm')
		    .isBlocking(false)
		    .showClose(true)
		    .keyboard(27)
		    .title('Shopping Cart')
		    .body(test)
		    .open();
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
                this._recipeService.deleteShoppingCart(this.authService.uid);
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


  onLogin(){
  	this.authService.login();
  }

  onLogout(){
  	this.authService.logout();
  }

  ngOnDestroy(){
	this.cartSubscription.unsubscribe();
	this.authSubscription.unsubscribe();
  }


}
