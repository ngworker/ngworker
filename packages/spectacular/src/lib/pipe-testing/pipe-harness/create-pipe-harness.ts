import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { getPipeAnnotation } from '../metadata/get-pipe-annotation';
import { SpectacularPipeComponent } from '../pipe-component/spectacular-pipe.component';
import { CreatePipeHarnessOptions } from './create-pipe-harness-options';
import { SpectacularPipeHarness } from './spectacular-pipe-harness';

import type { Observable } from 'rxjs';
function createPipeComponentTemplate(innerTemplate: string): string {
  return `<span id="${textId}">${innerTemplate}</span>`;
}

function createPipeFixture<TValue>(
  value: Observable<TValue> | TValue | null
): ComponentFixture<SpectacularPipeComponent<TValue>> {
  const pipeFixture = TestBed.createComponent(
    SpectacularPipeComponent
  ) as ComponentFixture<SpectacularPipeComponent<TValue>>;
  pipeFixture.componentInstance.value = value;
  pipeFixture.detectChanges();

  return pipeFixture;
}

/**
 * Set up a host component for the Angular pipe under test.
 *
 * Test it by updating the value and reading the rendered text.
 */
export function createPipeHarness<TValue>({
  declarations = [],
  imports = [],
  pipe,
  providers = [],
  template = `{{ value | ${getPipeAnnotation(pipe).name} }}`,
  value,
}: CreatePipeHarnessOptions<TValue>): SpectacularPipeHarness<TValue> {
  function configureTestbed(template: string): void | never {
    TestBed.configureTestingModule({
      declarations: [pipe, ...declarations, SpectacularPipeComponent],
      imports: [...imports],
      providers: [...providers],
    });
    TestBed.overrideTemplate(
      SpectacularPipeComponent,
      createPipeComponentTemplate(template)
    );
  }

  configureTestbed(template);
  TestBed.compileComponents();

  let pipeFixture = createPipeFixture(value);
  let pipeComponent = pipeFixture.componentInstance;

  return {
    inject: TestBed.inject.bind(TestBed),
    get text(): string {
      const valueElement: HTMLElement = pipeFixture.debugElement.query(
        By.css(`#${textId}`)
      ).nativeElement;

      return valueElement.textContent?.trim() ?? '';
    },
    set template(template: string) {
      const value = pipeComponent.value;

      TestBed.resetTestingModule();
      configureTestbed(template);

      pipeFixture = createPipeFixture(value);
      pipeComponent = pipeFixture.componentInstance;
    },
    set value(value: TValue | Observable<TValue> | null) {
      pipeComponent.value = value;
      pipeFixture.detectChanges();
    },
  };
}

const textId = '__SPECTACULAR_PIPE_COMPONENT_TEXT__';
