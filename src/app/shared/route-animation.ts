import { trigger,animate, transition, style } from '@angular/animations';

export const routeFadeStateTrigger = trigger('routeFadeState', [
		transition(':enter', [
			style({
				opacity: 0
			}),
			animate(100)
		]),
		transition(':leave', animate(300, style({
			opacity: 0
		})))
]);


export const routeSlideStateTrigger = trigger('routeSlideState', [
		transition(':enter', [
			style({
				transform: 'translatex(100%)',
				opacity: 0
			}),
			animate(300)
		]),
		transition(':leave', animate(300, style({
			transform: 'translatex(100%)',
			opacity: 0

		})))
	]);