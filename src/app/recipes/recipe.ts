import { Ingredient } from '../shared/ingredient';

export class Recipe {
	constructor(public name: string,
				public steps: string,
				public imagePath: string,
				public ingredients: Ingredient[],
				public uid?: string
				) {}
}
