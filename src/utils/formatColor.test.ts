import { formatColor } from './formatColor.js';

describe(formatColor.name, () => {
  it('should return the number value as given', () => {
    const result = formatColor(123_456);
    expect(result).toBe(123_456);
  });

  it('should return the decimal value of a hex color', () => {
    const result = formatColor('#1A2B3C');
    expect(result).toBe(1_715_004);
  });

  it('should throw an error for invalid hex colors', () => {
    expect(() => formatColor('#ZZZZZZ')).toThrowError('Invalid color format: #ZZZZZZ');
  });
});
