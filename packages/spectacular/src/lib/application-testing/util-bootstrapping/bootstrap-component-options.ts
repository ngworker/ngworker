import { NgZone, Type } from '@angular/core';

export interface BootstrapComponentOptions<TRootComponent> {
  readonly autoDetectChanges?: boolean;
  readonly component: Type<TRootComponent>;
  readonly ngZone: NgZone | null;
  readonly tag: string;
}
