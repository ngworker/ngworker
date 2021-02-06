import { stripLeadingCharacters } from './strip-leading-characters';

const emptyString = '';

describe(stripLeadingCharacters.name, () => {
  describe('Single leading character', () => {
    it(`doesn't touch the string when it's an empty string`, () => {
      const leadingCharacter = 'Z';

      const actualText = stripLeadingCharacters(leadingCharacter, emptyString);

      expect(actualText).toBe(emptyString);
    });

    it('outputs an empty string when a single-character string is the specified leading character', () => {
      const leadingCharacter = 'Y';
      const y = 'Y';

      const actualText = stripLeadingCharacters(leadingCharacter, y);

      expect(actualText).toBe(emptyString);
    });

    it('strips all characters when a multi-character string only contains the specified leading character', () => {
      const leadingCharacter = 'Z';
      const zzz = 'ZZZ';

      const actualText = stripLeadingCharacters(leadingCharacter, zzz);

      expect(actualText).toBe(emptyString);
    });

    it('strips all characters from the beginning of the string when they match the specified leading character', () => {
      const leadingCharacter = 'Z';
      const zzTop = 'ZZTop';

      const top = stripLeadingCharacters(leadingCharacter, zzTop);

      expect(top).toBe('Top');
    });

    it(`doesn't touch the string when it does not start with the specified leading character`, () => {
      const leadingCharacter = '?';
      const regex = '^?abcdefg$';

      const actualText = stripLeadingCharacters(leadingCharacter, regex);

      expect(actualText).toBe(regex);
    });
  });

  describe('Leading character sequence', () => {
    it(`doesn't touch the string when it's an empty string`, () => {
      const leadingSequence = 'XYZ';

      const actualText = stripLeadingCharacters(leadingSequence, emptyString);

      expect(actualText).toBe(emptyString);
    });

    it('outputs an empty string when a string is the specified leading character sequence', () => {
      const leadingCharacters = 'ABC';
      const abc = 'ABC';

      const actualText = stripLeadingCharacters(leadingCharacters, abc);

      expect(actualText).toBe(emptyString);
    });

    it('strips all characters from the beginning of the string when they match the specified leading character sequence', () => {
      const fiveFiveFive = '555';
      const phoneNumber = '5555551800000';

      const actualPhoneNumber = stripLeadingCharacters(
        fiveFiveFive,
        phoneNumber
      );

      expect(actualPhoneNumber).toBe('1800000');
    });

    it(`doesn't touch the string when it does not start with the specified leading character`, () => {
      const leadingCharacter = '?abc';
      const regex = '^?abcdefg$';

      const actualText = stripLeadingCharacters(leadingCharacter, regex);

      expect(actualText).toBe(regex);
    });
  });
});
