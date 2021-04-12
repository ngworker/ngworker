import { updateFile } from '@nrwl/nx-plugin/testing';

export function updateJsonFile<TJson>(
  file: string,
  mapper: (json: TJson) => TJson
): void {
  updateFile(file, content => {
    const json: TJson = JSON.parse(content);

    return JSON.stringify(mapper(json), null, 2);
  });
}
