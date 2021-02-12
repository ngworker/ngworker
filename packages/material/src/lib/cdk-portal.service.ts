import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { ComponentPortal, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal/portal';
import { entries } from './mat-sidenav-plugin.utils';

export type Inputs<T> = Partial<InstanceType<ComponentType<T>>>;

@Injectable({
  providedIn: 'root',
})
export class CdkPortalService {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly cfr: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    private readonly vcr: ViewContainerRef,
  ) {}

  private _useEl!: HTMLElement;
  private _useSel!: string;
  private _useTemp!: TemplatePortal<unknown>;
  private _domPortal!: DomPortalOutlet;

  /**
   *
   */
  create(element: HTMLElement): CdkPortalService {
    const cdkPortalService = this.injector.get(CdkPortalService);
    cdkPortalService.setElement(element);
    return cdkPortalService;
  }

  /**
   *
   */
  setElement(element: HTMLElement) {
    this._useEl = element;
  }


  /**
   *
   */
  useSelector(selector: string) {
    console.warn('useSelector is not implemented');
  }

  /**
   *
   */
  useTemplate() {
    console.warn('useTemplate is not implemented');
  }

  /**
   *
   */
  attachComponent<T>(
    component: ComponentType<T>,
    inputs?: Inputs<T>,
    changeDetection = true,
  ): ComponentRef<T> {

    if (!this._domPortal) {
      this._domPortal = this._getDomPortalOutlet(this._useEl);
    }
    const componentPortal = this._getComponentPortal(component);
    const componentRef = this._domPortal.attachComponentPortal(componentPortal);

    if (inputs) {
      entries(inputs).forEach(([key, value]) =>
        componentRef.instance[key] = (value as unknown) as T[keyof T]
      );
    }

    // @todo: ngChanges(see Angular-Testing-Lib)

    if (changeDetection) {
      componentRef.changeDetectorRef.detectChanges();
    }

    return componentRef;
  }

  /**
   *
   */
  isAttached<T>(componentRef: ComponentRef<T>) {
    return this.vcr.indexOf(componentRef?.hostView) !== -1;
  }

  /**
   *
   */
  move<T>(componentRef: ComponentRef<T>, currentIndex: number) {
    return this.vcr.move(componentRef?.hostView, currentIndex);
  }

  /**
   *
   */
  detachByRef<T>(componentRef: ComponentRef<T>) {
    const id = this.vcr.indexOf(componentRef?.hostView);
    this.detachByIndex(id);
  }

  /**
   *
   */
  detachByIndex<T>(id: number) {
    this.vcr.remove(id);
  }

  /**
   *
   */
  detachAll<T>() {
    this.vcr.clear();
  }

  /**
   *
   */
  private _getComponentPortal<T>(component: ComponentType<T>) {
    return new ComponentPortal(
      component,
      this.vcr,
      this.injector
    );
  }

  /**
   *
   */
  private _getDomPortalOutlet(element: HTMLElement) {
    return new DomPortalOutlet(
      element,
      this.cfr,
      this.appRef,
      this.injector,
      this.document,
    );
  }
}
