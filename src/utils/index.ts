export const formatColor = (color: string | number) => {
  if (typeof color === 'string') {
    const pattern = /#?(?<hex>[0-9a-f]{6})/i;
    const match = pattern.exec(color);

    if (!match?.groups?.hex) {
      throw new Error(`Invalid color format: ${color}`);
    }

    return parseInt(match.groups.hex, 16);
  }

  return color;
};
