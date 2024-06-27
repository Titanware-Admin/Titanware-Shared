import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { BannerComponent } from '../components/banner/banner.component';
import { ModalComponent } from '../components/modal/modal.component';
import { ToastComponent } from '../components/toast/toast.component';
import { WidgetComponent } from '../components/widget/widget.component';
import { BannerConfig, BannerContentAlignmentType, BannerLocation, BannerThemeType } from '../models/banner.models';
import { AlertModalConfig, ComponentModalConfig, ConfirmModalConfig, ImageModalConfig, ModalType } from '../models/modal.models';
import { ToastConfig, ToastThemeType } from '../models/toast.models';
import { WidgetConfig } from '../models/widget.models';
import AngularService from '../services/angular.service';
import ToastService from './toast.service';
import { ToastBaseComponent } from '../components/toast/toast.base.component';
import { OffcanvasConfig } from '../models/offcanvas.models';
import { OffcanvasComponent } from '../components/offcanvas/offcanvas.component';

@Injectable()
export default class PopupService {

  public modalCacheKey(guid: string): string { return `M-${guid}`; }
  public widgetCacheKey(guid: string): string { return `W-${guid}`; }
  public bannerCacheKey(guid: string): string { return `B-${guid}`; }
  public offcanvasCacheKey(guid: string): string { return `O-${guid}`; }
  public cache: Map<string, any> = new Map<string, any>();

  constructor(private service: AngularService, private toastService: ToastService) {
    this.service.addComponent("tbases", ToastBaseComponent);
  }

  public toast(config: ToastConfig) {
    this.toastService.addToast(config);
  }
  public toastSuccess(message: string, timeout: number = 3000, onClose: Function = null) {
    this.toast({
      theme: ToastThemeType.Success,
      icon: "fas fa-exclamation-circle",
      message: message,
      timeout: timeout,
      onClose: onClose
    });
  }
  public toastWarning(message: string, timeout: number = 3000, onClose: Function = null) {
    this.toast({
      theme: ToastThemeType.Warning,
      icon: "fas fa-exclamation-triangle",
      message: message,
      timeout: timeout,
      onClose: onClose
    });
  }
  public toastDanger(message: string, timeout: number = 3000, onClose: Function = null) {
    this.toast({
      theme: ToastThemeType.Danger,
      icon: "fas fa-exclamation-circle",
      message: message,
      timeout: timeout,
      onClose: onClose
    });
  }

  public modal(config: AlertModalConfig | ConfirmModalConfig | ComponentModalConfig | ImageModalConfig, params: Array<KeyValue<string, any>> = []): string {
    if (config) {
      let guid = this.service.generateSimpleId();
      let modalType = this.getModalType(config);
      let inputs = [
        { key: "guid", value: guid },
        { key: "type", value: modalType },
        { key: "config", value: config },
      ];
      inputs = params.length > 0 ? inputs.concat(params) : inputs;
      this.service.addComponent(guid, ModalComponent, inputs);
      this.cache.set(this.modalCacheKey(guid), config);
      return guid;
    }
    return null;
  }
  public removeModal(guid: string) {
    this.service.removeComponent(guid, ModalComponent);

    let key = this.modalCacheKey(guid);
    if (this.cache.has(key)) {
      let config = this.cache.get(key);
      if (config?.onClose) { config.onClose(); }
      this.cache.delete(key);
    }
  }
  public removeAllModals() {
    this.cache.forEach((v: any, k: string) => {
      let prefix = this.modalCacheKey("");
      if (k.startsWith(prefix)) {
        let guid = k.replace(prefix, "");
        this.service.removeComponent(guid, ModalComponent);
        if (v?.onClose) { v.onClose(); }
        this.cache.delete(k);
      }
    });
  }

  public widget(config: WidgetConfig) {
    if (config) {
      let guid = this.service.generateSimpleId();
      let inputs = [
        { key: "guid", value: guid },
        { key: "config", value: config },
      ];

      this.service.addComponent(guid, WidgetComponent, inputs);
      this.cache.set(this.widgetCacheKey(guid), config);
      return guid;
    }
    return null;
  }
  public removeWidget(guid: string) {
    this.service.removeComponent(guid, WidgetComponent);

    let key = this.widgetCacheKey(guid);
    if (this.cache.has(key)) {
      let config = this.cache.get(key);
      if (config?.onClose) { config.onClose(); }
      this.cache.delete(key);
    }
  }
  public removeAllWidgets() {
    this.cache.forEach((v: any, k: string) => {
      let prefix = this.widgetCacheKey("");
      if (k.startsWith(prefix)) {
        let guid = k.replace(prefix, "");
        this.service.removeComponent(guid, WidgetComponent);
        if (v?.onClose) { v.onClose(); }
        this.cache.delete(k);
      }
    });
  }

  public banner(config: BannerConfig): string {
    if (config) {
      let guid = this.service.generateSimpleId();
      let inputs = [
        { key: "guid", value: guid },
        { key: "config", value: config },
      ];

      this.service.addComponent(guid, BannerComponent, inputs);
      this.cache.set(this.bannerCacheKey(guid), config);
      return guid;
    }
    return null;
  }
  public bannerSaveDiscard(save: () => boolean, discard: () => boolean): string {
    return this.banner({
      location: BannerLocation.Bottom,
      contentAlignment: BannerContentAlignmentType.Right,
      message: "You have pending changes... ",
      buttons: [
        {
          theme: BannerThemeType.Secondary,
          buttonText: "Discard Changes",
          closeAfterClick: true,
          onClick: () => discard()
        },
        {
          theme: BannerThemeType.Success,
          buttonText: "Save Changes",
          closeAfterClick: false,
          onClick: () => save()
        }
      ],
    });
  }
  public removeBanner(guid: string) {
    this.service.removeComponent(guid, BannerComponent);

    let key = this.bannerCacheKey(guid);
    if (this.cache.has(key)) {
      let config = this.cache.get(key);
      if (config?.OnClose) { config.OnClose(); }
      this.cache.delete(key);
    }
  }
  public removeAllBanners() {
    this.cache.forEach((v: any, k: string) => {
      let prefix = this.bannerCacheKey("");
      if (k.startsWith(prefix)) {
        let guid = k.replace(prefix, "");
        this.service.removeComponent(guid, BannerComponent);
        if (v?.OnClose) { v.OnClose(); }
        this.cache.delete(k);
      }
    });
  }

  public offcanvas(config: OffcanvasConfig): string {
    if (config) {
      let guid = this.service.generateSimpleId();
      let inputs = [
        { key: "guid", value: guid },
        { key: "config", value: config },
      ];

      this.service.addComponent(guid, OffcanvasComponent, inputs);
      this.cache.set(this.offcanvasCacheKey(guid), config);
      return guid;
    }
    return null;
  }
  public removeOffcanvas(guid: string) {
    this.service.removeComponent(guid, OffcanvasComponent);

    let key = this.offcanvasCacheKey(guid);
    if (this.cache.has(key)) {
      let config = this.cache.get(key);
      if (config?.OnClose) { config.OnClose(); }
      this.cache.delete(key);
    }
  }

  public removeAllPopups(): void {
    this.removeAllModals();
    this.removeAllWidgets();
    this.removeAllBanners();
  }

  private getModalType(config: AlertModalConfig | ConfirmModalConfig | ComponentModalConfig | ImageModalConfig): ModalType {
    if (config instanceof AlertModalConfig) { return ModalType.Alert; }
    else if (config instanceof ConfirmModalConfig) { return ModalType.Confirmation; }
    else if (config instanceof ComponentModalConfig) { return ModalType.CustomComponent; }
    else if (config instanceof ImageModalConfig) { return ModalType.Image; }
    else { return ModalType.Alert; }
  } 
}
