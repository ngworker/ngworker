import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import {
  ComponentPortal,
  DomPortalOutlet,
  TemplatePortal,
} from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal/portal';
import { assertExists, entries } from './mat-sidenav-plugin.utils';

export type Inputs<T> = Partial<InstanceType<ComponentType<T>>>;

@Injectable({
  providedIn: 'root',
})
export class CdkPortalFactory {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly cfr: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    private readonly vcr: ViewContainerRef
  ) {}

  private _useEl: HTMLElement | undefined;
  private _useSel: string | undefined;
  private _useTemp: TemplatePortal<unknown> | undefined;
  private _domPortal: DomPortalOutlet | undefined;

  /**
   *
   */
  create(element: HTMLElement): CdkPortalFactory {
    const cdkPortalService = this.injector.get(CdkPortalFactory);
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
    console.warn('useSelector is not implemented', selector);
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
    changeDetection = true
  ): ComponentRef<T> {
    if (!this._domPortal) {
      assertExists(this._useEl);
      this._domPortal = this._getDomPortalOutlet(this._useEl);
    }
    const componentPortal = this._getComponentPortal(component);
    const componentRef = this._domPortal.attachComponentPortal(componentPortal);

    if (inputs) {
      entries(inputs).forEach(
        ([key, value]) =>
          (componentRef.instance[key] = (value as unknown) as T[keyof T])
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
  detachByIndex(id: number) {
    this.vcr.remove(id);
  }

  /**
   *
   */
  detachAll() {
    this.vcr.clear();
  }

  /**
   *
   */
  private _getComponentPortal<T>(component: ComponentType<T>) {
    return new ComponentPortal(component, this.vcr, this.injector);
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
      this.document
    );
  }
}
