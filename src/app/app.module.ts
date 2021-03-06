import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item.component';
import { RecipeService } from './recipes/recipes.service';
import { routing } from "./app.routing";
import { RecipeStartComponent } from './recipes/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AuthService} from './auth/auth.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuard } from './auth/auth-guard.service';
import {ContextMenuModule} from 'angular2-contextmenu';

export class CustomOption extends ToastOptions {
  // newestOnTop = false;
  showCloseButton = false;
  toastLife = 1500;
  positionClass = 'toast-bottom-center'; 
}


export const firebaseConfig = {
    apiKey: "AIzaSyCfpR2GfceInsJqb9KaOvI60Rmrejb3MLc",
    authDomain: "recipebook-2d2c3.firebaseapp.com",
    databaseURL: "https://recipebook-2d2c3.firebaseio.com",
    storageBucket: "recipebook-2d2c3.appspot.com",
    messagingSenderId: "85349312625"
  };

const myFirebaseAuthConfig = {
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    };


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }) 
  ],
  providers: [RecipeService ,AuthService ,AuthGuard ,{provide: ToastOptions, useClass: CustomOption}],
  bootstrap: [AppComponent]
})
export class AppModule { }
