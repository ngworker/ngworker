import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SpectacularPipeComponent } from '../pipe-component/spectacular-pipe.component';
import { CreatePipeHarnessOptions } from './create-pipe-harness-options';
import { SpectacularPipeHarness } from './spectacular-pipe-harness';

import type { Observable } from 'rxjs';
const textId = '__SPECTACULAR_PIPE_COMPONENT_TEXT__';

/**
 * Create a test harness for the specified Angular pipe. Test it by updating the
 * value and reading the rendered test.
 */
export function createPipeHarness<TValue>({
  declarations = [],
  imports = [],
  pipeType,
  pipeName,
  providers = [],
  template = `{{ value | ${pipeName} }}`,
  value,
}: CreatePipeHarnessOptions<TValue>): SpectacularPipeHarness<TValue> {
  TestBed.configureTestingModule({
    declarations: [pipeType, ...declarations, SpectacularPipeComponent],
    imports,
    providers,
  });
  TestBed.overrideTemplate(
    SpectacularPipeComponent,
    `<span id="${textId}">${template}</span>`
  );

  TestBed.compileComponents();
  let pipeFixture = TestBed.createComponent(
    SpectacularPipeComponent
  ) as ComponentFixture<SpectacularPipeComponent<TValue>>;
  let pipeComponent = pipeFixture.componentInstance;
  pipeComponent.value = value;
  pipeFixture.detectChanges();

  return {
    getText(): string {
      const valueElement: HTMLElement = pipeFixture.debugElement.query(
        By.css(`#${textId}`)
      ).nativeElement;

      return valueElement.textContent?.trim() ?? '';
    },
    setTemplate(template: string): void {
      const value = pipeComponent.value;

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        declarations: [pipeType, ...declarations, SpectacularPipeComponent],
        imports,
        providers,
      });
      TestBed.overrideTemplate(
        SpectacularPipeComponent,
        `<span id="${textId}">${template}</span>`
      );
      pipeFixture = TestBed.createComponent(
        SpectacularPipeComponent
      ) as ComponentFixture<SpectacularPipeComponent<TValue>>;

      pipeComponent = pipeFixture.componentInstance;

      pipeComponent.value = value;
      pipeFixture.detectChanges();
    },
    setValue(value: TValue | Observable<TValue> | null): void {
      pipeComponent.value = value;
      pipeFixture.detectChanges();
    },
  };
}
