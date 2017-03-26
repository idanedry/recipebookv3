import { Routes , RouterModule} from "@angular/router";
import { RecipesComponent } from './recipes/recipes.component';
import { RECIPE_ROUTES } from './recipes/recipes.routing';

const APP_ROUTES: Routes = [
	{path: '', redirectTo:'/recipes', pathMatch: 'full'},
	{path: 'recipes', component: RecipesComponent ,children: RECIPE_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);