import { NgModule, PipeTransform, Type } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { isStandalone } from '../../shared/is-standalone';
import { SpectacularPipeComponent } from '../pipe-component/spectacular-pipe.component';
import type { SpectacularPipeHarness } from './spectacular-pipe-harness';

type Tail<T extends any[]> = T extends [infer A, ...infer R] ? R : never;

/**
 * Angular pipe harness options.
 */
export interface CreatePipeHarnessOptions<
  TPipe extends PipeTransform = PipeTransform,
  TValue extends Parameters<TPipe['transform']>[0] = Parameters<
    TPipe['transform']
  >[0],
  TParameters extends Tail<Parameters<TPipe['transform']>> = Tail<
    Parameters<TPipe['transform']>
  >
> extends Pick<NgModule, 'declarations' | 'imports' | 'providers'> {
  /**
   * The type of the Angular pipe-under-test, for example `CamelizePipe`.
   */
  readonly pipe: Type<TPipe>;
  /**
   * The name of the Angular pipe-under-test, for example `camelize`.
   */
  readonly parameters?: TParameters;
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
  readonly value: TValue;
}

function createInnerTemplate(pipeName: string, parameters: unknown[]): string {
  return `{{ value | ${pipeName}${parameters.length > 0 ? ':' : ''}${parameters
    .map((_, index) => 'parameters[' + index + ']')
    .join(':')} }}`;
}

function createPipeComponentTemplate(innerTemplate: string): string {
  return `<span id="${textId}">${innerTemplate}</span>`;
}

function createPipeFixture<
  TPipe extends PipeTransform = PipeTransform,
  TValue extends Parameters<TPipe['transform']>[0] = Parameters<
    TPipe['transform']
  >[0],
  TParameters extends Tail<Parameters<TPipe['transform']>> = Tail<
    Parameters<TPipe['transform']>
  >
>(
  value: TValue,
  parameters: TParameters
): ComponentFixture<SpectacularPipeComponent<TPipe, TValue, TParameters>> {
  const pipeFixture = TestBed.createComponent(
    SpectacularPipeComponent
  ) as ComponentFixture<SpectacularPipeComponent<TPipe, TValue, TParameters>>;
  pipeFixture.componentInstance.value = value;
  pipeFixture.componentInstance.parameters = parameters;
  pipeFixture.detectChanges();

  return pipeFixture;
}

/**
 * Set up a host component for the Angular pipe under test.
 *
 * Test it by updating the value and reading the rendered text.
 */
export function createPipeHarness<
  TPipe extends PipeTransform = PipeTransform,
  TValue extends Parameters<TPipe['transform']>[0] = Parameters<
    TPipe['transform']
  >[0],
  TParameters extends Tail<Parameters<TPipe['transform']>> = Tail<
    Parameters<TPipe['transform']>
  >
>(
  options: CreatePipeHarnessOptions<TPipe, TValue, TParameters>
): SpectacularPipeHarness<TPipe, TValue, TParameters> {
  function configureTestbed(template: string): void | never {
    const isStandalonePipe = isStandalone(pipe);

    TestBed.configureTestingModule({
      declarations: [...declarations].concat(isStandalonePipe ? [] : [pipe]),
      imports: [...imports].concat(isStandalonePipe ? [pipe] : []),
      providers: [...providers],
    });
    TestBed.overrideTemplateUsingTestingModule(
      SpectacularPipeComponent,
      createPipeComponentTemplate(template)
    );
  }

  const {
    declarations = [],
    imports = [],
    parameters = [],
    pipe,
    pipeName,
    providers = [],
    value,
  } = options;
  let { template } = options;

  configureTestbed(template ?? createInnerTemplate(pipeName, parameters));
  TestBed.compileComponents();

  let pipeFixture = createPipeFixture(value, parameters);
  let pipeComponent = pipeFixture.componentInstance;

  return {
    inject: TestBed.inject.bind(TestBed),
    set parameters(parameters: TParameters) {
      const value = pipeComponent.value;

      TestBed.resetTestingModule();
      configureTestbed(template ?? createInnerTemplate(pipeName, parameters));

      pipeFixture = createPipeFixture(value, parameters);
      pipeComponent = pipeFixture.componentInstance;
    },
    get text(): string {
      const valueElement: HTMLElement = pipeFixture.debugElement.query(
        By.css(`#${textId}`)
      ).nativeElement;

      return valueElement.textContent?.trim() ?? '';
    },
    set template(templateParam: string) {
      template = templateParam;
      const value = pipeComponent.value;

      TestBed.resetTestingModule();
      configureTestbed(template);

      pipeFixture = createPipeFixture(value, parameters);
      pipeComponent = pipeFixture.componentInstance;
    },
    set value(value: TValue) {
      pipeComponent.value = value;
      pipeFixture.detectChanges();
    },
  };
}

const textId = '__SPECTACULAR_PIPE_COMPONENT_TEXT__';
