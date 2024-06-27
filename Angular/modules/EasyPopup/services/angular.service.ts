import { KeyValue } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, ElementRef, EmbeddedViewRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';

@Injectable()
export default class AngularService {

  private counter = 0;
  private componentRefs: Array<KeyValue<string, ComponentRef<unknown>>> = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) { }

  public addComponent<T>(name: string, component: T, params: Array<KeyValue<string, any>> = [], containerOverride: ElementRef = null): void {
    if (name && component) {
      const componentRef = this.addComponentRef(name, component, params);
      if (componentRef) {
        this.appRef.attachView(componentRef.hostView);
        const embeddedViewRef = componentRef.hostView as EmbeddedViewRef<T>;
        const htmlElem = embeddedViewRef.rootNodes[0] as HTMLElement;

        if (containerOverride) {
          containerOverride.nativeElement.appendChild(htmlElem);
        } else {
          document.body.appendChild(htmlElem);
        }
      }
    }
  }
  public removeComponent(name: string, component: any): void {
    if (name && component) {
      const componentRef = this.removeComponentRef(name, component);
      if (componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      }
    }
  }

  public generateSimpleId(): string {
    return Math.random().toString(16);
  }

  private addComponentRef(name: string, component: any, inputs: Array<KeyValue<string, any>> = []): ComponentRef<any> {
    try {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory<any>(component);
      const componentRef = componentFactory.create(this.injector);

      if (inputs && inputs.length > 0) {
        componentFactory.inputs.forEach(x => {
          let input = inputs.find(p => p.key === x.propName);
          if (input) { componentRef.instance[x.propName] = input.value; }
        });
      }

      this.componentRefs.push({ key: this.getKey(name, component), value: componentRef });
      return componentRef;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  private removeComponentRef(name: string, component: any): ComponentRef<unknown> {
    try {
      let componentRefIndex = this.componentRefs.findIndex(x => x.key === this.getKey(name, component));
      if (componentRefIndex >= 0) {
        let keyValuePair = this.componentRefs.splice(componentRefIndex, 1)[0];
        return keyValuePair.value;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  private getKey(name: string, component: Type<any>): string {
    let componentName = component.name;
    return `${componentName ? componentName : 'Unknown'}_${name}`;
  }
}
