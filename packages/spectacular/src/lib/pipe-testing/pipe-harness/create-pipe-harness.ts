import { isStandalone, NgModule, PipeTransform, Type } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { Observable } from 'rxjs';
import { SpectacularPipeComponent } from '../pipe-component/spectacular-pipe.component';
import type { SpectacularPipeHarness } from './spectacular-pipe-harness';

/**
 * Angular pipe harness options.
 */
export interface CreatePipeHarnessOptions<TValue>
  extends Pick<NgModule, 'declarations' | 'imports' | 'providers'> {
  /**
   * The type of the Angular pipe-under-test, for example `CamelizePipe`.
   */
  readonly pipe: Type<PipeTransform>;
  /**
   * The name of the Angular pipe-under-test, for example `camelize`.
   */
  readonly pipeName: string;
  /**
   * The template used to test the Angular pipe, for example
   * `'{{ value | camelize }}'`.
   *
   * NOTE! The `value` property is in context of the template.
   */
  readonly template?: string;
  /**
   * The initial value passed through the Angular pipe.
   */
  readonly value: Observable<TValue> | TValue | null;
}

function createPipeComponentTemplate(innerTemplate: string): string {
  return `<span id="${textId}">${innerTemplate}</span>`;
}

function createPipeFixture<TValue>(
  value: Observable<TValue> | TValue | null,
): ComponentFixture<SpectacularPipeComponent<TValue>> {
  const pipeFixture = TestBed.createComponent(
    SpectacularPipeComponent,
  ) as ComponentFixture<SpectacularPipeComponent<TValue>>;
  pipeFixture.componentRef.setInput('value', value);
  pipeFixture.detectChanges();

  return pipeFixture;
}

/**
 * Set up a host component for the Angular pipe under test.
 *
 * Test it by updating the value and reading the rendered text.
 */
export function createPipeHarness<TValue>(
  options: CreatePipeHarnessOptions<TValue>,
): SpectacularPipeHarness<TValue> {
  function configureTestbed(template: string): void | never {
    const isStandalonePipe = isStandalone(pipe);

    TestBed.configureTestingModule({
      declarations: [...declarations].concat(isStandalonePipe ? [] : [pipe]),
      imports: [...imports].concat(isStandalonePipe ? [pipe] : []),
      providers: [...providers],
    });
    TestBed.overrideTemplateUsingTestingModule(
      SpectacularPipeComponent,
      createPipeComponentTemplate(template),
    );
  }

  const {
    declarations = [],
    imports = [],
    pipe,
    pipeName,
    providers = [],
    template = `{{ value | ${pipeName} }}`,
    value,
  } = options;

  configureTestbed(template);
  TestBed.compileComponents();

  let pipeFixture = createPipeFixture(value);
  let pipeComponent = pipeFixture.componentInstance;

  return {
    inject: TestBed.inject.bind(TestBed),
    get text(): string {
      const valueElement: HTMLElement = pipeFixture.debugElement.query(
        By.css(`#${textId}`),
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
      pipeFixture.componentRef.setInput('value', value);
      pipeFixture.detectChanges();
    },
  };
}

const textId = '__SPECTACULAR_PIPE_COMPONENT_TEXT__';
