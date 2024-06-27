import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ComponentModalConfig, ModalConfigBase } from '../../../../models/modal.models';
import AngularService from '../../../../services/angular.service';
import ModalService from '../../../../services/modal.service';
import { ModalBaseComponent } from '../../modal-base.component';

@Component({
  selector: 'modal-custom-component',
  templateUrl: './customcomponent.html',
  styleUrls: ['./customcomponent.scss']
})
export class CustomComponentModalComponent extends ModalBaseComponent implements OnInit, AfterViewInit {
  @Input() set setConfig(config: ModalConfigBase) {
    this._config = config as ComponentModalConfig;
    this.setClasses();
  }
  public get config(): ComponentModalConfig { return this._config; }
  private _config: ComponentModalConfig;

  @ViewChild('CustomComponent') customComponent: ElementRef;

  public theme: string;
  public btnTheme: string;

  private id: string = `CustomComponent_${this.service.generateSimpleId()}`;

  constructor(private modalService: ModalService, private service: AngularService) {
    super();
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    if (this.config?.component && this.customComponent) {
      this.service.addComponent(this.id, this.config.component, [], this.customComponent)
    }
  }

  public close(): void {
    if (this.config?.component) {
      this.service.removeComponent(this.id, this.config.component);
    }
    this.onClose.emit(true);
  }

  private setClasses(): void {
    this.theme = this.modalService.getThemeClass(this.config);
    this.btnTheme = this.modalService.getThemeBtnClass(this.config);
  }
}
