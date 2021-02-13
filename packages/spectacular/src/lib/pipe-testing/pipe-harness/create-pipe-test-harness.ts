import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TestPipeComponent } from '../test-pipe/test-pipe.component';
import { CreatePipeTestHarnessOptions } from './create-pipe-test-harness-options';
import { SpectacularPipeHarness } from './spectacular-pipe-harness';

import type { Observable } from 'rxjs';
const textId = '__SPECTACULAR_PIPE_TEST_TEXT__';

/**
 * Create a test harness for the specified Angular pipe. Test it by updating the
 * value and reading the rendered test.
 */
export function createPipeTestHarness<TValue>({
  declarations = [],
  imports = [],
  pipeType,
  pipeName,
  providers = [],
  template = `{{ value | ${pipeName} }}`,
  value,
}: CreatePipeTestHarnessOptions<TValue>): SpectacularPipeHarness<TValue> {
  function testCaseSetup(templateOverride?: string): void {
    TestBed.configureTestingModule({
      declarations: [pipeType, ...declarations, TestPipeComponent],
      imports,
      providers,
    }).compileComponents();
    TestBed.overrideTemplate(
      TestPipeComponent,
      `<span id="${textId}">${templateOverride ?? template}</span>`
    );

    pipeFixture = TestBed.createComponent(
      TestPipeComponent
    ) as ComponentFixture<TestPipeComponent<TValue>>;
    pipeComponent = pipeFixture.componentInstance;
    pipeComponent.value = value;
    pipeFixture.detectChanges();
  }

  let pipeComponent: TestPipeComponent<TValue>;
  let pipeFixture: ComponentFixture<TestPipeComponent<TValue>>;

  return {
    getText(): string {
      const valueElement: HTMLElement = pipeFixture.debugElement.query(
        By.css(`#${textId}`)
      ).nativeElement;

      return valueElement.textContent?.trim() ?? '';
    },
    setTemplate(template: string): void {
      TestBed.resetTestingModule();
      testCaseSetup(template);
    },
    setValue(value: TValue | Observable<TValue> | null): void {
      pipeComponent.value = value;
      pipeFixture.detectChanges();
    },
    testCaseSetup(): void {
      testCaseSetup();
    },
  };
}
