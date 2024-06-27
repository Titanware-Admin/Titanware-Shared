import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BannerButton, BannerConfig, BannerContentAlignmentType, BannerLocation, BannerThemeType } from '../../models/banner.models';
import AngularService from '../../services/angular.service';
import { fadeInOutAnimation } from './banner.animations';

@Component({
  selector: 'banner',
  templateUrl: './banner.html',
  styleUrls: ['./banner.scss'],
  animations: [fadeInOutAnimation]
})
export class BannerComponent implements OnInit, AfterViewInit {

  @Input() guid: string;
  @Input() config: BannerConfig;

  @ViewChild('CustomComponent') customComponent: ElementRef;
  private id: string = `CustomComponent_${this.service.generateSimpleId()}`;

  public animationState: string = 'void';
  public alignmentTypes = BannerContentAlignmentType;
  public location: string;
  public alignment: string;
  public theme: string;

  constructor(private service: AngularService) { }

  public ngOnInit(): void {
    if (this.config) {
      this.location = this.getLocationClass();
      this.alignment = this.getAlignmentClass();
      this.theme = this.getThemeClass();
      this.config?.buttons?.forEach(btn => {
        btn.themeClass = this.getButtonThemeClass(btn);
      });
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

  public onClick(btn: BannerButton) {
    if (btn) {
      let shouldContinue = false;
      if (btn.onClick) {
        shouldContinue = btn.onClick();
      }
      if (shouldContinue || btn.closeAfterClick) {
        this.onClose();
      }
    }
  }
  public onClose(): void {
    this.config?.onClose && this.config.onClose();
    this.animationState = 'void';
  }

  public getLocationClass(): string {
    switch (this.config.location) {
      case BannerLocation.Top:
        return 'banner-top';
      case BannerLocation.Bottom:
        return 'banner-bottom';
      default:
        return '';
    }
  }
  public getThemeClass(): string {
    switch (this.config.theme) {
      case BannerThemeType.Success:
        return 'banner-success';
      case BannerThemeType.Warning:
        return 'banner-warning';
      case BannerThemeType.Danger:
        return 'banner-danger';
      case BannerThemeType.Primary:
        return 'banner-primary';
      case BannerThemeType.Secondary:
        return 'banner-secondary';
      case BannerThemeType.Info:
        return 'banner-info';
      case BannerThemeType.Light:
        return 'banner-light';
      case BannerThemeType.Dark:
        return 'banner-dark';
      case BannerThemeType.Default:
      default:
        return 'banner-fuzzy';
    }
  }
  public getAlignmentClass(): string {
    switch (this.config.contentAlignment) {
      case BannerContentAlignmentType.Left:
        return 'banner-content-left';
      case BannerContentAlignmentType.Center:
        return 'banner-content-center';
      case BannerContentAlignmentType.Right:
        return 'banner-content-right';
      case BannerContentAlignmentType.SpaceBetween:
        return 'banner-content-between';
      default:
        return 'banner-content-left';
    }
  }
  public getButtonThemeClass(btn: BannerButton): string {
    if (btn.themeClass) return btn.themeClass;
    switch (btn.theme) {
      case BannerThemeType.Success:
        return 'btn-success';
      case BannerThemeType.Warning:
        return 'btn-warning';
      case BannerThemeType.Danger:
        return 'btn-danger';
      case BannerThemeType.Primary:
        return 'btn-primary';
      case BannerThemeType.Secondary:
        return 'btn-secondary';
      case BannerThemeType.Info:
        return 'btn-info';
      case BannerThemeType.Default:
      default:
        return 'btn-light';
    }
  }
}
