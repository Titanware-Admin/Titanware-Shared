
export class WidgetConfig {
  constructor() {
    this.location = WidgetLocation.BottomRight;
    this.maximizeTheme = WidgetThemeType.Default;
    this.minimizeTheme = WidgetThemeType.Primary;
    this.size = WidgetSize.Small;
  }

  public component: any;
  public location?: WidgetLocation; 
  public maximizeTheme?: WidgetThemeType;
  public minimizeTheme?: WidgetThemeType;
  public size?: WidgetSize;
  public icon?: string;

  public onMaximize?: Function;
  public onMinimize?: Function;
  public onLoad?: Function;
  public onClose?: Function;
}

export enum WidgetLocation {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight
}
export enum WidgetThemeType {
  Default,
  Primary,
  Secondary,
  Info,
  Success,
  Warning,
  Danger
}
export enum WidgetSize {
  ExtraSmall,
  Small,
  Medium,
  Large,
  ExtraLarge,
  NearlyFullscreen
}

