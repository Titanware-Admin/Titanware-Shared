
export class ModalConfigBase {
  constructor() {
    // Defaults
    this.size = ModalSize.Medium;
    this.showHeader = true;
    this.showFooter = true;
    this.closeOnOuterClick = false;
    this.fuzzyBackground = false;
  }

  public title?: string;
  public theme?: ModalThemeType;
  public icon?: string;
  public size?: ModalSize;

  public showHeader?: boolean;
  public showFooter?: boolean;
  public showIconInBody?: boolean;

  public closeOnOuterClick?: boolean;
  public fuzzyBackground?: boolean;

  public onLoad?: Function;
  public onClose?: Function;
}

export enum ModalType {
  Alert,
  Confirmation,
  CustomComponent,
  Image
}
export enum ModalThemeType {
  Default,
  Primary,
  Secondary,
  Info,
  Success,
  Warning,
  Danger
}
export enum ModalSize {
  ExtraSmall,
  Small,
  Medium,
  Large,
  ExtraLarge,
  Fullscreen
}

export class AlertModalConfig extends ModalConfigBase {
  constructor() {
    super();
  }

  public message?: string;
  public customMessage?: Function;
  public buttonText?: string;
}
export class ConfirmModalConfig extends ModalConfigBase {
  constructor() {
    super();
  }

  public message?: string;
  public customMessage?: Function;
  public closeButtonText?: string;
  public confirmButtonText?: string;

  public onConfirm?: Function;
}
export class ComponentModalConfig extends ModalConfigBase {
  constructor() {
    super();
  }

  public component: any;
  public buttonText?: string;
}
export class ImageModalConfig extends ModalConfigBase {
  constructor() {
    super();
  }

  public imageSource: string;
}

