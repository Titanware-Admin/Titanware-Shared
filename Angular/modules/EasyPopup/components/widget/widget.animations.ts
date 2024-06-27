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

export const minmaxAnimation = trigger('minmax', [
  state('min', style({
    borderRadius: '50%',
    minHeight: '4rem',
    minWidth: '4rem',
    maxHeight: '4rem',
    maxWidth: '4rem'
  })),
  state('max', style({
    borderRadius: '0',
    minHeight: '100%',
    minWidth: '100%',
    maxHeight: '100%',
    maxWidth: '100%'
  })),
  transition('min => max', [
    animate('300ms ease-in')
  ]),
  transition('max => min', [
    animate('300ms ease-in')
  ])
]);

