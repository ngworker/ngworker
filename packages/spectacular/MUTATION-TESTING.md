# Mutation Testing with StrykerJS

This project includes StrykerJS mutation testing to improve test quality by
testing the tests themselves.

## What is Mutation Testing?

Mutation testing is a method of software testing which involves modifying
programs in small ways (mutations) and then running the test suite to see if the
mutations are caught. If a mutation doesn't cause any tests to fail, it suggests
that area needs better test coverage.

## Setup

StrykerJS has been configured for the `spectacular` package with two
configurations:

### Simple Configuration

For utility functions and simple code without Angular dependencies:

```bash
cd packages/spectacular
npx stryker run stryker.simple.conf.js
```

This configuration:

- Uses a simplified Jest setup without Angular testing utilities
- Focuses on pure TypeScript functions
- Runs quickly and works reliably
- Currently configured to test utility functions like `trim-leading-text.ts`

### Full Configuration (Advanced)

For the complete test suite including Angular components and services:

```bash
cd packages/spectacular
npx stryker run
```

This configuration:

- Uses the full Jest setup with Angular testing utilities
- Includes all source files and tests
- May require additional setup for complex Angular dependencies

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

# Full configuration (requires Angular setup fixes)
npx stryker run stryker.conf.js
```

## Configuration Files

- `stryker.conf.js` - Main configuration for complete test suite
- `stryker.simple.conf.js` - Simplified configuration for utility functions
- `jest.stryker.config.js` - Jest configuration optimized for Stryker
- `jest.simple.config.js` - Simplified Jest configuration for basic testing

## Reports

Mutation test reports are generated as:

- HTML report: `mutation-report.html` (human-readable)
- Console output with summary statistics

## Thresholds

The current thresholds are:

- High: 80% (excellent coverage)
- Low: 60% (acceptable coverage)
- Break: 50% (minimum required coverage)

## Tips for Better Mutation Testing

1. **Focus on Logic**: Mutation testing is most valuable for business logic and
   algorithms
2. **Don't Aim for 100%**: Perfect mutation scores are often not cost-effective
3. **Analyze Survivors**: Look at mutants that survive to identify missing test
   cases
4. **Iterative Improvement**: Use mutation testing to gradually improve test
   quality

## Known Issues

- The full Angular configuration requires additional setup for complex
  dependencies
- Some Angular-specific code may need custom mutators
- Performance can be slow for large codebases (use simple config for quick
  feedback)

## Files Ignored

The following files are excluded from mutation testing:

- Test files (`*.spec.ts`, `*.test.ts`)
- Type definition files (`*.d.ts`)
- Build artifacts and temporary files
