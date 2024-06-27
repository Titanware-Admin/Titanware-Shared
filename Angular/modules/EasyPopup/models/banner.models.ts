

export class BannerConfig {
  constructor() {
    // Defaults
    this.location = BannerLocation.Top;
    this.contentAlignment = BannerContentAlignmentType.Left;
    this.theme = BannerThemeType.Default;
    this.buttons = [];
  }

  public location?: BannerLocation;
  public contentAlignment?: BannerContentAlignmentType;
  public theme?: BannerThemeType;
  public component?: any;
  public message?: string;
  public buttons?: Array<BannerButton>;

  public onLoad?: Function;
  public onClose?: Function;
}

export class BannerButton {
  public theme?: BannerThemeType;
  public themeClass?: string;
  public buttonText?: string;

  public onClick?(): boolean;
  public closeAfterClick?: boolean;
}

export enum BannerLocation {
  Top,
  Bottom
}
export enum BannerContentAlignmentType {
  Left,
  Center,
  Right,
  SpaceBetween
}
export enum BannerThemeType {
  Default,
  Primary,
  Secondary,
  Info,
  Success,
  Warning,
  Danger,
  Light,
  Dark
}


