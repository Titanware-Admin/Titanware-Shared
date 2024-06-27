import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  state('x-void', style({
    width: 0,
  })),
  state('y-void', style({
    height: 0,
  })),
  state('fadeIn', style({

  })),
  transition('x-void => fadeIn', [
    animate('300ms ease-in')
  ]),
  transition('fadeIn => x-void', [
    animate('300ms ease-out')
  ]),
  transition('y-void => fadeIn', [
    animate('300ms ease-in')
  ]),
  transition('fadeIn => y-void', [
    animate('300ms ease-out')
  ])
]);
