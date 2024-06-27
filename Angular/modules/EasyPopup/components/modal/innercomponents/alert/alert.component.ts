import { Component, Input, OnInit } from '@angular/core';
import { AlertModalConfig, ModalConfigBase } from '../../../../models/modal.models';
import ModalService from '../../../../services/modal.service';
import { ModalBaseComponent } from '../../modal-base.component';

@Component({
  selector: 'modal-alert',
  templateUrl: './alert.html',
  styleUrls: ['./alert.scss']
})
export class AlertModalComponent extends ModalBaseComponent implements OnInit {
  @Input() set setConfig(config: ModalConfigBase) {
    this._config = config as AlertModalConfig;
    this.setClasses();
  }
  public get config(): AlertModalConfig { return this._config; }
  private _config: AlertModalConfig;

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

  private setClasses(): void {
    this.theme = this.modalService.getThemeClass(this.config);
    this.btnTheme = this.modalService.getThemeBtnClass(this.config);
    this.txtTheme = this.modalService.getThemeTextClass(this.config);
  }
}
