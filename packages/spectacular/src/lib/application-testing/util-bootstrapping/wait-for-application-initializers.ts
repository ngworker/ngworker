import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';

/**
 * Wait for application initializers to complete.
 */
export async function waitForApplicationInitializers(): Promise<void> {
  const applicationInitStatus = TestBed.inject(ApplicationInitStatus);

  await applicationInitStatus.donePromise;
}
