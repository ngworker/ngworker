import { stripLeadingCharacter } from './strip-leading-character';

const emptyString = '';

describe(stripLeadingCharacter.name, () => {
  it(`doesn't touch the string when it's an empty string`, () => {
    const leadingCharacter = 'Z';

    const actualText = stripLeadingCharacter(leadingCharacter, emptyString);

    expect(actualText).toBe(emptyString);
  });

  it('outputs an empty string when a single-character string is the specified leading character', () => {
    const leadingCharacter = 'Y';
    const y = 'Y';

    const actualText = stripLeadingCharacter(leadingCharacter, y);

    expect(actualText).toBe(emptyString);
  });

  it('strips all characters when a multi-character string only contains the specified leading character', () => {
    const leadingCharacter = 'Z';
    const zzz = 'ZZZ';

    const actualText = stripLeadingCharacter(leadingCharacter, zzz);

    expect(actualText).toBe(emptyString);
  });

  it('strips all characters from the beginning of the string when they match the specified leading character', () => {
    const leadingCharacter = 'Z';
    const zzTop = 'ZZTop';

    const top = stripLeadingCharacter(leadingCharacter, zzTop);

    expect(top).toBe('Top');
  });

  it(`doesn't touch the string when it does not start with the specified leading character`, () => {
    const leadingCharacter = '?';
    const regex = '^?abcdefg$';

    const actualText = stripLeadingCharacter(leadingCharacter, regex);

    expect(actualText).toBe(regex);
  });
});
