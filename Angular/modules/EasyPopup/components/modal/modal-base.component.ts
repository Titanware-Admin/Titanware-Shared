import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  template: '',
})
export class ModalBaseComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>(); 
  constructor() { }
}
