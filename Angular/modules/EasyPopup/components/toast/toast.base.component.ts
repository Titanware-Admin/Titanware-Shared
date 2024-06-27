import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import ToastService from '../../services/toast.service';

@Component({
  selector: 'toast-base',
  template: '<div #toasts class="toast-cntr"></div>',
  styleUrls: ['./toast.scss']
})
export class ToastBaseComponent implements AfterViewInit {
  @ViewChild('toasts', { read: ElementRef, static: true }) container: ElementRef;

  constructor(private service: ToastService) { }

  public ngAfterViewInit(): void {
    this.service.container = this.container;
  }

}
