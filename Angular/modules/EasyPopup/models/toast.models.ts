
export class ToastConfig {
  constructor() {
    this.timeout = 3000;
  }

  public message: string;
  public theme?: ToastThemeType;
  public icon?: string;
  public timeout?: number;

  public onLoad?: Function;
  public onClose?: Function;
}

export enum ToastThemeType {
  Default,
  Primary,
  Secondary,
  Info,
  Success,
  Warning,
  Danger
}


