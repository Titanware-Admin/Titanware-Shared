import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  state('void', style({
    opacity: 0
  })),
  state('fadeIn', style({
    opacity: 1
  })),
  transition('void => fadeIn', [
    animate('300ms ease-in')
  ]),
  transition('fadeIn => void', [
    animate('300ms ease-out')
  ])
]);
