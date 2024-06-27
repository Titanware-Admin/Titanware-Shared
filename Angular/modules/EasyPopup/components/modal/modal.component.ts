import { Component, Input, OnInit } from '@angular/core';
import { ConfirmModalConfig, ModalConfigBase, ModalType } from '../../models/modal.models';
import ModalService from '../../services/modal.service';
import PopupService from '../../services/popup.service';
import { fadeInOutAnimation } from './modal.animations';

@Component({
  selector: 'modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  animations: [fadeInOutAnimation]
})
export class ModalComponent implements OnInit {

  @Input() guid: string;
  @Input() type: ModalType;
  @Input() set config(config: ModalConfigBase) {
    this._config = config;
    this.setSizeClass();
  }
  public get config(): ModalConfigBase { return this._config; }
  private _config: ModalConfigBase;

  public animationState: string = 'void';
  public modalTypes = ModalType;
  public size: string;

  constructor(private popupService: PopupService, private modalService: ModalService) { }

  public ngOnInit(): void {
    if (this.config) {
      if (this.config.onLoad) {
        this.config.onLoad();
      }

      this.animationState = 'fadeIn';
    }
  }

  public close() {
    this.animationState = 'void';
    setTimeout(() => {
      if (this.config && this.config.onClose) { this.config.onClose(); }
      this.popupService.removeModal(this.guid);
    }, 300); // 300ms is outro animation length
  }

  public confirm() { // Only applies to Confirm Modals
    let config = this.config as ConfirmModalConfig;
    if (config) {
      if (config.onConfirm) {
        config.onConfirm();
      }
      this.close();
    }
  }

  private setSizeClass(): void {
    this.size = this.modalService.getSizeClass(this.config);
  }
}
