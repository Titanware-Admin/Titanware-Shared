import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { WidgetConfig, WidgetLocation, WidgetSize, WidgetThemeType } from '../../models/widget.models';
import AngularService from '../../services/angular.service';
import { fadeInOutAnimation, minmaxAnimation } from './widget.animations';

@Component({
  selector: 'widget',
  templateUrl: './widget.html',
  styleUrls: ['./widget.scss'],
  animations: [fadeInOutAnimation, minmaxAnimation]
})
export class WidgetComponent implements OnInit, AfterViewInit {

  @Input() guid: string;
  @Input() set config(config: WidgetConfig) {
    this._config = config;
    this.setClasses();
  }
  public get config(): WidgetConfig { return this._config; }
  private _config: WidgetConfig;

  @ViewChild('CustomComponent') customComponent: ElementRef;
  private id: string = `CustomComponent_${this.service.generateSimpleId()}`;

  public animationState: string = 'void';
  public isOpen: boolean = false;
  public isOpening: boolean = false;
  public isClosing: boolean = false;

  public location: string;
  public size: string;
  public max: string;
  public min: string;

  constructor(private service: AngularService) { }

  public ngOnInit(): void {
    if (this.config) {
      if (this.config.onLoad) {
        this.config.onLoad();
      }

      this.animationState = 'fadeIn';
    }
  }

  public ngAfterViewInit(): void {
    if (this.config?.component && this.customComponent) {
      this.service.addComponent(this.id, this.config.component, [], this.customComponent)
    }
  }

  public onMaximize() {
    if (this.isOpen == false) {
      if (this.config && this.config.onMaximize) {
        this.config.onMaximize();
      }

      this.isOpening = true;
      setTimeout(() => {
        this.isOpening = false;
        this.isOpen = true;
      }, 500);

    }
  }
  public onMinimize() {
    if (this.isOpen == true) {
      if (this.config && this.config.onMinimize) {
        this.config.onMinimize();
      }

      this.isClosing = true;
      setTimeout(() => {
        this.isOpen = false;
        this.isClosing = false;
      }, 300);
    }
  }
  public onClose() {
    if (this.config?.component) {
      this.service.removeComponent(this.id, this.config.component);
    }
    if (this.config && this.config.onClose) {
      this.config.onClose();
    }

    this.animationState = 'void';
    setTimeout(() => { this.service.removeComponent(this.guid, WidgetComponent); }, 500);
  }

  private setClasses(): void {
    this.location = this.getLocationClass();
    this.size = this.getSizeClass();
    this.max = this.getMaxThemeClass();
    this.min = this.getMinThemeClass();
  }
  private getLocationClass(): string {
    switch (this.config.location) {
      case WidgetLocation.TopLeft:
        return 'widget-top-left';
      case WidgetLocation.TopRight:
        return 'widget-top-right';
      case WidgetLocation.BottomLeft:
        return 'widget-bottom-left';
      case WidgetLocation.BottomRight:
        return 'widget-bottom-right';
    }
  }
  private getSizeClass(): string {
    switch (this.config.size) {
      case WidgetSize.ExtraSmall:
        return 'widget-xsm';
      case WidgetSize.Small:
        return 'widget-sm';
      case WidgetSize.Medium:
        return 'widget-md';
      case WidgetSize.Large:
        return 'widget-lg';
      case WidgetSize.ExtraLarge:
        return 'widget-xlg';
      case WidgetSize.NearlyFullscreen:
        return 'widget-fullscreen';
      default:
        return 'widget-md';
    }
  }
  private getMaxThemeClass(): string {
    return this.getThemeClass(this.config.maximizeTheme);
  }
  private getMinThemeClass(): string {
    return this.getThemeClass(this.config.minimizeTheme);
  }
  private getThemeClass(type: WidgetThemeType): string {
    switch (type) {
      case WidgetThemeType.Success:
        return 'widget-success';
      case WidgetThemeType.Warning:
        return 'widget-warning';
      case WidgetThemeType.Danger:
        return 'widget-danger';
      case WidgetThemeType.Primary:
        return 'widget-primary';
      case WidgetThemeType.Secondary:
        return 'widget-secondary';
      case WidgetThemeType.Info:
        return 'widget-info';
      case WidgetThemeType.Default:
      default:
        return '';
    }
  }
}
