import { PLATFORM_INITIALIZER } from '@angular/core';
import { TestBed } from '@angular/core/testing';

/**
 * Run platform initializers.
 */
export function runPlatformInitializers(): void {
  const initializers = TestBed.inject(PLATFORM_INITIALIZER, [], {
    optional: true,
  });

  initializers.forEach(initializer => initializer());
}
