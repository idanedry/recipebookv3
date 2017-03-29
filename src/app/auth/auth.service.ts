import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

@Injectable()
export class AuthService {
  isLoggedIn : boolean;
  token : string;
  uid : string;
  displayName : string ;
  photoURL : string ;
  authState = null ;
  user;


  constructor(private af : AngularFire) { 
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
  		// provider: AuthProviders.Facebook,
  		// method: AuthMethods.Popup
  	}).then(authState => {
  		this.authState = authState;
  		console.log("Logged in succesfully");
  	}).catch(error => console.log(error))
  }

  logout(){
  	this.af.auth.logout();
  	console.log("Logout.")
  }

  getSomething(){
  	this.af.auth.subscribe( user => {
  		if(!user) {
  			this.user = {}; 
  			this.isLoggedIn = false;
  			// console.log(this.user);
  			return
  		}
		this.user = user; 
  		this.isLoggedIn = true;
  		console.log(this.user);
  	})
  }

  // isAuthenticated(){
  // }

}
