import { ensureLeadingCharacter } from './ensure-leading-character';

describe(ensureLeadingCharacter.name, () => {
  it('replaces a string with the specified leading character when the string is empty', () => {
    const leadingCharacter = 'A';
    const emptyString = '';

    const nonEmpty = ensureLeadingCharacter(leadingCharacter, emptyString);

    expect(nonEmpty).toBe(leadingCharacter);
  });

  it(`keeps a single character string when it's the specified leading character`, () => {
    const leadingCharacter = 'B';

    const singleCharacter = ensureLeadingCharacter(
      leadingCharacter,
      leadingCharacter
    );

    expect(singleCharacter).toBe(leadingCharacter);
  });

  it(`prepends the leading character to a multi-character string when it doesn't start with the specified leading character`, () => {
    const leadingCharacter = '@';
    const username = 'LayZeeDK';

    const twitterHandle = ensureLeadingCharacter(leadingCharacter, username);

    expect(twitterHandle).toBe('@LayZeeDK');
  });

  it(`prepends the leading character to a single-character string when it doesn't start with the specified leading character`, () => {
    const leadingCharacter = 'C';
    const d = 'D';

    const cd = ensureLeadingCharacter(leadingCharacter, d);

    expect(cd).toBe('CD');
  });

  it(`doesnt't touch the string when it starts with the specified leading character`, () => {
    const leadingCharacter = '!';
    const command = '!welcome';

    const botCommand = ensureLeadingCharacter(leadingCharacter, command);

    expect(botCommand).toBe(command);
  });
});
