import { Component, Input, OnInit } from '@angular/core';
import { ImageModalConfig, ModalConfigBase } from '../../../../models/modal.models';
import ModalService from '../../../../services/modal.service';
import { ModalBaseComponent } from '../../modal-base.component';

@Component({
  selector: 'modal-image',
  templateUrl: './image.html',
  styleUrls: ['./image.scss']
})
export class ImageModalComponent extends ModalBaseComponent implements OnInit {
  @Input() set setConfig(config: ModalConfigBase) {
    this._config = config as ImageModalConfig;
    this.setClasses();
  }
  public get config(): ImageModalConfig { return this._config; }
  private _config: ImageModalConfig;

  public theme: string;

  constructor(private modalService: ModalService) {
    super();
  }

  public ngOnInit(): void { }

  public close(): void {
    this.onClose.emit(true);
  }

  private setClasses(): void {
    this.theme = this.modalService.getThemeClass(this.config);
  }
}
