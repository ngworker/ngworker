import { PipeTransform, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { createPipeHostTemplate } from './pipe-host/create-pipe-host-template';
import { SpectacularPipeHostComponent } from './pipe-host/spectacular-pipe-host.component';
import { SpectacularCreatePipeOptions } from './spectacular-create-pipe-options';
import { SpectactularPipeFixture } from './spectacular-pipe-fixture';
import { PassthroughPipe } from './test-util/passthrough.pipe';

function invalidatePipeFixture<TPipeValue>(
  fixture: SpectactularPipeFixture<TPipeValue>,
  reason: string
): void {
  const reasonMessage = reason ? ` because ${reason}` : '';
  const errorMessage = `This ${SpectactularPipeFixture.name} is invalid${reasonMessage}.`;
  const throwInvalidError = () => {
    throw new Error(errorMessage);
  };

  const hostComponentKey: keyof SpectactularPipeFixture<TPipeValue> =
    'hostComponent';
  Object.defineProperty(fixture, hostComponentKey, {
    get: throwInvalidError,
  });
  fixture.getText = throwInvalidError;
  fixture.setValue = throwInvalidError;
}

const invalidPipeFixture = {} as SpectactularPipeFixture<unknown>;

export class SpectacularPipeTestbed {
  private static pipeFixture = invalidPipeFixture;
  private static pipeType: Type<PipeTransform> = PassthroughPipe;
  private static valueTemplate = '{{ value }}';
  private static userModuleDef: TestModuleMetadata = {};

  static configureTestingModule(moduleDef: TestModuleMetadata): void {
    this.userModuleDef = moduleDef;
  }

  static createPipe<TPipeValue>({
    pipeType,
    pipeName,
    template = `{{ value | ${pipeName} }}`,
    value,
  }: SpectacularCreatePipeOptions<TPipeValue>): SpectactularPipeFixture<TPipeValue> {
    this.pipeType = pipeType;
    this.valueTemplate = template;
    this.resetTestingModule();
    this.setPipeFixture(value);

    return this.pipeFixture as SpectactularPipeFixture<TPipeValue>;
  }

  static overrideTemplate<TPipeValue>(
    template: string
  ): SpectactularPipeFixture<TPipeValue> {
    const currentFixture = this
      .pipeFixture as SpectactularPipeFixture<TPipeValue>;
    const value = currentFixture.hostComponent.value;
    this.invalidatePipeFixture(
      currentFixture,
      `${SpectacularPipeTestbed.overrideTemplate.name} was called`
    );

    this.valueTemplate = template;
    this.resetTestingModule();
    this.setPipeFixture(value);

    return this.pipeFixture as SpectactularPipeFixture<TPipeValue>;
  }

  private static invalidatePipeFixture<TPipeValue>(
    fixture: SpectactularPipeFixture<TPipeValue>,
    reason: string
  ): void {
    invalidatePipeFixture(fixture, reason);
  }

  private static resetTestingModule(): void {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      ...this.userModuleDef,
      declarations: [
        ...(this.userModuleDef.declarations ?? []),
        this.pipeType,
        SpectacularPipeHostComponent,
      ],
    });
    TestBed.overrideTemplate(
      SpectacularPipeHostComponent,
      createPipeHostTemplate(this.valueTemplate)
    );
    TestBed.compileComponents();
  }

  private static setPipeFixture<TPipeValue>(
    value: Observable<TPipeValue> | TPipeValue | null
  ): void {
    const hostFixture = TestBed.createComponent(
      SpectacularPipeHostComponent
    ) as ComponentFixture<SpectacularPipeHostComponent<TPipeValue>>;
    const pipeFixture = new SpectactularPipeFixture(hostFixture);
    pipeFixture.setValue(value);
    this.pipeFixture = pipeFixture;
  }
}

invalidatePipeFixture(
  invalidPipeFixture,
  `${SpectacularPipeTestbed.createPipe.name} has not been called`
);
