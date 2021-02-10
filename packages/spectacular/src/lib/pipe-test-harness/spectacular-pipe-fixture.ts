import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { internalPipeHostTextId } from './pipe-host/internal-pipe-host-text-id';
import { SpectacularPipeHostComponent } from './pipe-host/spectacular-pipe-host.component';

export class SpectactularPipeFixture<TPipeValue> {
  get hostComponent(): SpectacularPipeHostComponent<TPipeValue> {
    return this.hostFixture.componentInstance;
  }

  constructor(
    private hostFixture: ComponentFixture<
      SpectacularPipeHostComponent<TPipeValue>
    >
  ) {}

  getText(): string {
    const valueElement: HTMLElement = this.hostFixture.debugElement.query(
      By.css(`#${internalPipeHostTextId}`)
    ).nativeElement;

    return valueElement.textContent?.trim() ?? '';
  }

  setValue(value: TPipeValue | Observable<TPipeValue> | null): void {
    this.hostComponent.value = value;
    this.hostFixture.detectChanges();
  }
}
