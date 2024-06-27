

export class OffcanvasConfig {
  constructor() {
    this.location = OffcanvasLocation.Left;
  }

  public title?: string;
  public location?: OffcanvasLocation;
  public component?: any;
  public message?: string;

  public fuzzyBackground?: boolean;
  public closeOnOuterClick?: boolean;

  public onLoad?: Function;
  public onClose?: Function;
}

export enum OffcanvasLocation {
  Left,
  Top,
  Right,
  Bottom
}


