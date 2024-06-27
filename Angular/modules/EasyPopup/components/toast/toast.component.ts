import { Component, Input, OnInit } from '@angular/core';
import { ToastConfig, ToastThemeType } from '../../models/toast.models';
import ToastService from '../../services/toast.service';
import { fadeInOutAnimation } from './toast.animations';

@Component({
  selector: 'toast',
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'],
  animations: [fadeInOutAnimation]
})
export class ToastComponent implements OnInit {

  @Input() guid: string;
  @Input() set config(config: ToastConfig) {
    this._config = config;
    this.theme = this.getThemeClass();
  }
  public get config(): ToastConfig { return this._config; }
  private _config: ToastConfig;

  public theme: string;
  public animationState: string = 'void';

  constructor(private service: ToastService) { }

  public ngOnInit(): void {
    if (this.config) {
      if (this.config.onLoad) {
        this.config.onLoad();
      }

      this.animationState = 'fadeIn';
      this.setupTimeout();
    }
  }

  private setupTimeout(): void {
    setTimeout(() => {
      this.animationState = 'void';
      if (this.config && this.config.onClose) { this.config.onClose(); }
      setTimeout(() => {
        this.service.removeToast(this.guid);
      }, 500);
    }, Math.max(this.config.timeout - 500, 0)); // 500ms is outro animation length
  }
  private getThemeClass(): string {
    switch (this.config.theme) {
      case ToastThemeType.Success:
        return 'toast-success';
      case ToastThemeType.Warning:
        return 'toast-warning';
      case ToastThemeType.Danger:
        return 'toast-danger';
      case ToastThemeType.Primary:
        return 'toast-primary';
      case ToastThemeType.Secondary:
        return 'toast-secondary';
      case ToastThemeType.Info:
        return 'toast-info';
      case ToastThemeType.Default:
      default:
        return '';
    }
  }

}
