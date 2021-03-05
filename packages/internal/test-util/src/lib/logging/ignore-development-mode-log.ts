export function ignoreDevelopmentModeLog(): void {
  const _consoleLog = console.log;
  // filter out development mode notice
  jest.spyOn(console, 'log').mockImplementation((...args) => {
    const [message] = args;

    if (
      typeof message === 'string' &&
      message.startsWith('Angular is running in development mode.')
    ) {
      return;
    }

    _consoleLog.call(console, ...args);
  });
}
