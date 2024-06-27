import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  state('void', style({
    opacity: 0,
    top: '2rem'
  })),
  state('fadeIn', style({
    opacity: 1,
    top: '0',
  })),
  transition('void => fadeIn', [
    animate('500ms ease-in')
  ]),
  transition('fadeIn => void', [
    animate('500ms ease-out')
  ])
]);
