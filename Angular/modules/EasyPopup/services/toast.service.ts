import { KeyValue } from "@angular/common";
import { ElementRef, Injectable } from "@angular/core";
import { ToastComponent } from "../components/toast/toast.component";
import { ToastConfig } from "../models/toast.models";
import AngularService from "./angular.service";

@Injectable()
export default class ToastService {

  private _configs: KeyValue<string, ToastConfig>[] = [];
  public get configs(): KeyValue<string, ToastConfig>[] { return this._configs; }

  public container: ElementRef;

  constructor(private service: AngularService) { }

  public addToast(config: ToastConfig): void {
    if (config) {
      let guid = this.service.generateSimpleId();
      let inputs = [
        { key: "guid", value: guid },
        { key: "config", value: config },
      ];
      this.configs.push({ key: guid, value: config });
      this.service.addComponent(guid, ToastComponent, inputs, this.container);
    }
  }
  public removeToast(guid: string): void {
    if (guid) {
      this._configs = this.configs.filter(x => x.key !== guid);
      this.service.removeComponent(guid, ToastComponent);
    }
  }
}
