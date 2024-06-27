
import { Component } from '@angular/core';
import PopupService from './services/popup.service';
import { AlertModalConfig, ModalSize, ModalThemeType } from './models/modal.models';

@Component({
  selector: 'popup-examples',
  template: ''
})
export class PopupExamplesComponent {

  constructor(private popupService: PopupService) { }

  // Toast Examples
  public toastExamples(): void {
    this.popupService.toastSuccess('Success: Your request was successful.');
    this.popupService.toastWarning('Warning: Your request has warnings.', 5000);
    this.popupService.toastDanger('Danger: Your request failed.', 5000, () => { console.log('Toast Removed'); });
  }

  // Modal Examples
  public modalExamples(): void {
    var guid = this.popupService.modal({
      title: 'Danger: Bad Request',
      theme: ModalThemeType.Danger,
      size: ModalSize.Medium,
      icon: 'fa fa-exclamation-triangle',
      message: 'Your request was bad, please try again',

      showHeader: true,
      showFooter: true, 
    } as AlertModalConfig);

    setTimeout(() => { 
      this.popupService.removeModal(guid);
    }, 2000);
  }
}
