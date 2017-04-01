import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isLoggedIn : boolean;
  uid : string;
  authState = null ;

  constructor(private af : AngularFire, private _router : Router) { 
   	this.af.auth.subscribe( user => {
   			if(user) {
   				this.isLoggedIn = true;
   				this.uid = user.uid;
   			} else {
   				this.isLoggedIn = false;
   				this.uid = "";
   			}
    		})
	}

  login(){
  	this.af.auth.login({
  	}).then(authState => {
  		this.authState = authState;
  		this._router.navigate([''])
  		console.log("Logged in succesfully");
  	}).catch(error => console.log(error))
  }

  logout(){
  	this.af.auth.logout();
  	this._router.navigate([''])
  	console.log("Logout.")
  }

}
