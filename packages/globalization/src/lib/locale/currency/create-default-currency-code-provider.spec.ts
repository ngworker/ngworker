import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { createDefaultCurrencyCodeProvider } from './create-default-currency-code-provider';

describe(createDefaultCurrencyCodeProvider.name, () => {
  describe('Angular default', () => {
    it(`the US Dollar is Angular's default currency code without a provider`, () => {
      const usDollar = 'USD';

      TestBed.configureTestingModule({});

      const currencyCode = TestBed.inject(DEFAULT_CURRENCY_CODE);
      expect(currencyCode).toBe(usDollar);
    });
  });

  describe('User-defined', () => {
    it(`the Euro is the application's default currency code when passed`, () => {
      const euro = 'EUR';

      TestBed.configureTestingModule({
        providers: [createDefaultCurrencyCodeProvider(euro)],
      });

      const currencyCode = TestBed.inject(DEFAULT_CURRENCY_CODE);
      expect(currencyCode).toBe(euro);
    });

    it(`the British Pound is the application's default currency code when passed`, () => {
      const britshPound = 'GBP';

      TestBed.configureTestingModule({
        providers: [createDefaultCurrencyCodeProvider(britshPound)],
      });

      const currencyCode = TestBed.inject(DEFAULT_CURRENCY_CODE);
      expect(currencyCode).toBe(britshPound);
    });
  });

  describe('Validation', () => {
    it('throws when an empty string is passed', () => {
      const emptyString = '';

      const act = () =>
        TestBed.configureTestingModule({
          providers: [createDefaultCurrencyCodeProvider(emptyString)],
        });

      expect(act).toThrowError();
    });

    it('throws when whitespace is passed', () => {
      const whitespace = '   ';

      const act = () =>
        TestBed.configureTestingModule({
          providers: [createDefaultCurrencyCodeProvider(whitespace)],
        });

      expect(act).toThrowError();
    });

    it('throws when one space is passed', () => {
      const oneSpace = ' ';

      const act = () =>
        TestBed.configureTestingModule({
          providers: [createDefaultCurrencyCodeProvider(oneSpace)],
        });

      expect(act).toThrowError();
    });

    it('throws when trailing space is passed', () => {
      const trailingSpace = 'USD ';

      const act = () =>
        TestBed.configureTestingModule({
          providers: [createDefaultCurrencyCodeProvider(trailingSpace)],
        });

      expect(act).toThrowError();
    });

    it('throws when leading space is passed', () => {
      const leadingSpace = ' USD';

      const act = () =>
        TestBed.configureTestingModule({
          providers: [createDefaultCurrencyCodeProvider(leadingSpace)],
        });

      expect(act).toThrowError();
    });

    it('throws when two characters are passed', () => {
      const twoCharacters = 'EU';

      const act = () =>
        TestBed.configureTestingModule({
          providers: [createDefaultCurrencyCodeProvider(twoCharacters)],
        });

      expect(act).toThrowError();
    });

    it('throws when one character is passed', () => {
      const oneCharacter = 'E';

      const act = () =>
        TestBed.configureTestingModule({
          providers: [createDefaultCurrencyCodeProvider(oneCharacter)],
        });

      expect(act).toThrowError();
    });

    it('throws when a lower case currency code is passed', () => {
      const lowerCase = 'eur';

      const act = () =>
        TestBed.configureTestingModule({
          providers: [createDefaultCurrencyCodeProvider(lowerCase)],
        });

      expect(act).toThrowError();
    });
  });
});
