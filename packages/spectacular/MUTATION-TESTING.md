# Mutation Testing with StrykerJS

This project includes StrykerJS mutation testing to improve test quality by testing the tests themselves.

## What is Mutation Testing?

Mutation testing is a method of software testing which involves modifying programs in small ways (mutations) and then running the test suite to see if the mutations are caught. If a mutation doesn't cause any tests to fail, it suggests that area needs better test coverage.

## Current Status

✅ **Working**: Mutation testing is functional for utility functions and non-Angular specific code  
⚠️ **Limited**: Full Angular component and service testing has technical limitations due to ESM module loading issues in Stryker's sandbox environment

## Setup

StrykerJS has been configured for the `spectacular` package with two configurations:

### Simple Configuration (Recommended)

For utility functions and non-Angular specific code:

```bash
cd packages/spectacular
npx stryker run stryker.simple.conf.js
```

This configuration:
- Uses a simplified Jest setup without complex Angular dependencies
- Focuses on utility functions and standalone TypeScript code
- Runs quickly and works reliably
- Currently achieves 100% mutation score on `trim-leading-text.ts`

### Full Configuration (Angular Utilities)

For Angular-compatible utility functions:

```bash
cd packages/spectacular
npx stryker run
```

This configuration:
- Tests utility functions that support Angular libraries but don't require complex Angular setup
- Includes utility functions from `util-text`, `util-dom`, and `util-bootstrapping`
- Currently achieves 41% mutation score on 13 files (39 mutants)

## Running Mutation Tests

### Via Nx (Recommended)

```bash
# Run mutation tests for spectacular package
nx run spectacular:mutation-test

# Run mutation tests for all packages (when available)
nx run-many --targets=mutation-test

# Run mutation tests for affected packages only
nx affected --targets=mutation-test
```

### Direct StrykerJS Commands

```bash
# From spectacular package directory
cd packages/spectacular

# Simple configuration (working)
npx stryker run stryker.simple.conf.js

# Full configuration (utility functions)
npx stryker run stryker.conf.js
```

## Configuration Files

- `stryker.conf.js` - Main configuration for utility functions
- `stryker.simple.conf.js` - Simplified configuration for pure utility functions
- `jest.stryker.config.js` - Jest configuration optimized for Stryker (experimental)
- `jest.simple.config.js` - Simplified Jest configuration for basic testing

## Reports

Mutation test reports are generated as:
- HTML report: `mutation-report.html` (human-readable)
- Console output with summary statistics
- CI artifacts: Reports are automatically uploaded in GitHub Actions

## Thresholds

The current thresholds are:
- High: 80% (excellent coverage)
- Low: 60% (acceptable coverage)
- Break: 50% (minimum required coverage)

## Current Limitations

### Angular-Specific Code
Due to ESM module loading issues in Stryker's sandbox environment, the following are currently not supported:
- Angular components using `@Component` decorator
- Angular services using dependency injection
- Complex Angular testing utilities that require `TestBed` setup
- Code that imports Angular modules with ESM format

### Workaround
The current configuration focuses on:
- Pure TypeScript utility functions
- DOM manipulation utilities
- Bootstrapping utilities that don't require Angular DI
- Text processing utilities

### Future Improvements
- Monitor Stryker updates for better Angular/ESM support
- Consider alternative approaches for testing Angular-specific code
- Potentially use different mutation testing tools for Angular components

## Tips for Better Mutation Testing

1. **Focus on Logic**: Mutation testing is most valuable for business logic and algorithms
2. **Don't Aim for 100%**: Perfect mutation scores are often not cost-effective
3. **Analyze Survivors**: Look at mutants that survive to identify missing test cases
4. **Iterative Improvement**: Use mutation testing to gradually improve test quality

## Files Covered

Currently mutation testing covers:
- `src/lib/feature-testing/util-text/**/*.ts` (text utilities)
- `src/lib/application-testing/util-dom/**/*.ts` (DOM utilities)
- `src/lib/application-testing/util-bootstrapping/**/*.ts` (bootstrapping utilities)

## Files Ignored

The following files are excluded from mutation testing:
- Test files (`*.spec.ts`, `*.test.ts`)
- Type definition files (`*.d.ts`)
- Complex Angular components and services (due to ESM limitations)
- Build artifacts and temporary files