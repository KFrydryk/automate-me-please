import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

let component;

describe('AppComponent', () => {
  beforeEach(async(() => {
    component = new AppComponent();
  }));

  it('should handle submit correctly with valid PESEL', () => {
    component.inputNumber = '19321212346';
    component.onSubmit();
    expect(component.isValid).toBe(true);
    expect(component.day).toBe(12);
    expect(component.year).toBe(2019);
    expect(component.month).toBe(12);
  });

  it('should handle submit correctly with invalid PESEL', () => {
    component.inputNumber = '19321212345';
    component.onSubmit();
    expect(component.day).toBe(undefined);
    expect(component.isValid).toBe(true);
  });

  it('should accept valid PESEL numbers', () => {
    expect(component.isValidPesel('64042999928')).toBe(true);
    expect(component.isValidPesel('52022114478')).toBe(true);
    expect(component.isValidPesel('72021706812')).toBe(true);
    expect(component.isValidPesel('80042448774')).toBe(true);
    expect(component.isValidPesel('97031003029')).toBe(true);
  });

  it('should reject PESEL numbers with invalid controlNumber', () => {
    expect(component.isValidPesel('44051401358')).toBe(false);
    expect(component.isValidPesel('97031003021')).toBe(false);
    expect(component.isValidPesel('97031003023')).toBe(false);
  });

  it('should reject PESEL numbers with invalid date', () => {
    expect(component.isValidPesel('96023007818')).toBe(false);
    expect(component.isValidPesel('96130207819')).toBe(false);
    expect(component.isValidPesel('96000207813')).toBe(false);
    expect(component.isValidPesel('95022907815')).toBe(false);
  });

  it('should reject PESEL numbers of invalid type', () => {
    expect(component.isValidPesel('')).toBe(false);
    expect(component.isValidPesel('640429999281')).toBe(false);
    expect(component.isValidPesel(1)).toBe(false);
    expect(component.isValidPesel(true)).toBe(false);
    expect(component.isValidPesel(null)).toBe(false);
  });

  it('should accept valid dates', () => {
    expect(component.verifyDate(2019, 2, 28)).toBe(true);
    expect(component.verifyDate(2020, 2, 29)).toBe(true);
    expect(component.verifyDate(2020, 2, 30)).toBe(true);
    expect(component.verifyDate(2020, 1, 1)).toBe(true);
    expect(component.verifyDate(2020, 12, 31)).toBe(true);
  });

  it('should reject invalid dates', () => {
    expect(component.verifyDate(2019, 1, 32)).toBe(false);
    expect(component.verifyDate(2019, 2, 29)).toBe(false);
    expect(component.verifyDate(2020, 2, 29)).toBe(false);
    expect(component.verifyDate(2020, 2, 30)).toBe(false);
    expect(component.verifyDate(2019, 3, 32)).toBe(false);
    expect(component.verifyDate(2019, 4, 31)).toBe(false);
    expect(component.verifyDate(2019, 5, 32)).toBe(false);
    expect(component.verifyDate(2019, 6, 31)).toBe(false);
    expect(component.verifyDate(2019, 7, 32)).toBe(false);
    expect(component.verifyDate(2019, 8, 32)).toBe(false);
    expect(component.verifyDate(2019, 9, 31)).toBe(false);
    expect(component.verifyDate(2019, 10, 32)).toBe(false);
    expect(component.verifyDate(2019, 11, 31)).toBe(false);
    expect(component.verifyDate(2019, 12, 32)).toBe(false);
  });

  it('should identify birth in XIXth century correctly', () => {
      const pesel19Century: Array<number> = [1, 9, 9, 2, 1, 2, 1, 2, 3, 4, 5];
      expect(component.getYear(pesel19Century)).toEqual(1919);
  });

  it('should identify birth in XXth century correctly', () => {
      const pesel20Century: Array<number> = [1, 9, 1, 2, 1, 2, 1, 2, 3, 4, 5];
      expect(component.getYear(pesel20Century)).toEqual(1919);
  });

  it('should identify birth in XXIth century correctly', () => {
      const pesel21Century: Array<number> = [1, 9, 3, 2, 1, 2, 1, 2, 3, 4, 5];
      expect(component.getYear(pesel21Century)).toEqual(2019);
  });

  it('should identify birth in XXIIth century correctly', () => {
      const pesel22Century: Array<number> = [1, 9, 5, 2, 1, 2, 1, 2, 3, 4, 5];
      expect(component.getYear(pesel22Century)).toEqual(2119);
  });

  it('should identify birth in XXIIIth century correctly', () => {
      const pesel23Century: Array<number> = [1, 9, 7, 2, 1, 2, 1, 2, 3, 4, 5];
      expect(component.getYear(pesel23Century)).toEqual(2219);
  });

  it('should identify sex correctly', () => {
    expect(component.isPeselMale(0)).toBe(false);
    expect(component.isPeselMale(1)).toBe(true);
  });

});
