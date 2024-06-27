import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { OffcanvasConfig, OffcanvasLocation } from '../../models/offcanvas.models';
import AngularService from '../../services/angular.service';
import { fadeInOutAnimation } from './offcanvas.animations';

@Component({
  selector: 'offcanvas',
  templateUrl: './offcanvas.html',
  styleUrls: ['./offcanvas.scss'],
  animations: [fadeInOutAnimation]
})
export class OffcanvasComponent implements OnInit, AfterViewInit {

  @Input() guid: string;
  @Input() config: OffcanvasConfig;

  @ViewChild('CustomComponent') customComponent: ElementRef;
  private id: string = `CustomComponent_${this.service.generateSimpleId()}`;

  private animationTime: number = 300;
  private animationDelay: number = 100;

  public animationState: string = null;
  public location: string;
  public alignment: string;
  public isReady: boolean = false;

  constructor(private service: AngularService) { }

  public ngOnInit(): void {
    if (this.config) {
      this.animationState = this.getStartAnimationState();
      setTimeout(() => {
        this.location = this.getLocationClass();
        if (this.config.onLoad) {
          this.config.onLoad();
        }

        this.animationState = 'fadeIn';
        setTimeout(() => {
          this.isReady = true;
        }, this.animationTime);
      }, this.animationDelay);
    }
  }
  public ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.config?.component && this.customComponent) {
        this.service.addComponent(this.id, this.config.component, [], this.customComponent)
      }
    }, this.animationTime + this.animationDelay + 50);
  }

  public onClose(): void {
    if (this.config.onClose) {
      this.config.onClose();
    }

    this.isReady = false;
    this.animationState = this.getStartAnimationState();
    setTimeout(() => {
      this.service.removeComponent(this.guid, OffcanvasComponent);
    }, this.animationTime);
  }
  public onBackdropClick(): void {
    if (this.config?.closeOnOuterClick) {
      this.onClose();
    }
  }

  private getLocationClass(): string {
    switch (this.config.location) {
      case OffcanvasLocation.Top:
        return 'offcanvas-top';
      case OffcanvasLocation.Right:
        return 'offcanvas-end';
      case OffcanvasLocation.Bottom:
        return 'offcanvas-bottom';
      case OffcanvasLocation.Left:
      default:
        return 'offcanvas-start';
    }
  }
  private getStartAnimationState(): string {
    return this.config.location == OffcanvasLocation.Top || this.config.location == OffcanvasLocation.Bottom ? 'y-void' : 'x-void';
  }
}
