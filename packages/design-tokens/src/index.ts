/**
 * Brand tokens. Use Tailwind classes first; import these only where a className
 * cannot reach, such as tab bar options or icon colors. tokens.css mirrors these
 * values and tokens.test.ts fails if the two drift apart.
 */
export const colors = {
  navy: '#182B3B',
  ivory: '#F5F2EA',
  white: '#FFFFFF',
  // Terracotta 500 and sage 500 are the brand hues and fail WCAG AA for small text.
  // Use the 700 shades wherever they carry text.
  terracotta500: '#B87555',
  terracotta700: '#8F5338',
  sage500: '#6D8272',
  sage700: '#4F6354',
  gray100: '#ECEAE4',
  gray300: '#CFCCC4',
  gray500: '#6F6E69',
  gray700: '#45443F',
  critical: '#A4312A',
} as const;

export type ColorToken = keyof typeof colors;

/** Minimum interactive size in points: Apple HIG 44pt, Android 48dp. Use the larger. */
export const minTouchTarget = 48;

export const radius = { card: 16, button: 10, input: 10 } as const;

/** WCAG 2.x relative luminance of a #RRGGBB color. */
function relativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map((start) => {
    const value = Number.parseInt(hex.slice(start, start + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const [red = 0, green = 0, blue = 0] = channels;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/** WCAG 2.x contrast ratio between two #RRGGBB colors, from 1 to 21. */
export function contrastRatio(first: string, second: string): number {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort(
    (a, b) => b - a,
  );
  return ((lighter ?? 0) + 0.05) / ((darker ?? 0) + 0.05);
}
