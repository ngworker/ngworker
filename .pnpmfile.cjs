module.exports = {
  hooks: {
    readPackage: package => {
      switch (package.name) {
        case 'any-observable':
          package.dependencies.rxjs = package.devDependencies.rxjs;

          break;
      }

      return package;
    },
  },
};
