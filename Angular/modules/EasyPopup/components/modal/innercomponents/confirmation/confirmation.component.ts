import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmModalConfig, ModalConfigBase } from '../../../../models/modal.models';
import ModalService from '../../../../services/modal.service';
import { ModalBaseComponent } from '../../modal-base.component';

@Component({
  selector: 'modal-confirmation',
  templateUrl: './confirmation.html',
  styleUrls: ['./confirmation.scss']
})
export class ConfirmationModalComponent extends ModalBaseComponent implements OnInit {
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Input() set setConfig(config: ModalConfigBase) {
    this._config = config as ConfirmModalConfig;
    this.setClasses();
  }
  public get config(): ConfirmModalConfig { return this._config; }
  private _config: ConfirmModalConfig;

  public theme: string;
  public btnTheme: string;
  public txtTheme: string;

  constructor(private modalService: ModalService) {
    super();
  }

  public ngOnInit(): void { }

  public close(): void {
    this.onClose.emit(true);
  }

  public confirm(): void {
    this.onConfirm.emit(true);
  }

  private setClasses(): void {
    this.theme = this.modalService.getThemeClass(this.config);
    this.btnTheme = this.modalService.getThemeBtnClass(this.config);
    this.txtTheme = this.modalService.getThemeTextClass(this.config);
  }
}
