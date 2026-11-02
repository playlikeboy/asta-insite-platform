import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { colors, contrastRatio } from './index';

const AA_TEXT = 4.5;
const AA_LARGE_TEXT_AND_UI = 3;

describe('contrastRatio', () => {
  it('matches the known WCAG extremes', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1);
  });
});

describe('brand color pairs', () => {
  it.each([
    ['navy on ivory', colors.navy, colors.ivory],
    ['navy on white', colors.navy, colors.white],
    ['ivory on navy', colors.ivory, colors.navy],
    ['terracotta 700 on ivory', colors.terracotta700, colors.ivory],
    ['white on terracotta 700', colors.white, colors.terracotta700],
    ['sage 700 on ivory', colors.sage700, colors.ivory],
    ['white on sage 700', colors.white, colors.sage700],
    ['gray 500 on ivory', colors.gray500, colors.ivory],
    ['gray 700 on white', colors.gray700, colors.white],
    ['critical on ivory', colors.critical, colors.ivory],
  ])('%s meets AA for text', (_name, foreground, background) => {
    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it.each([
    ['terracotta 500 on white', colors.terracotta500, colors.white],
    ['sage 500 on ivory', colors.sage500, colors.ivory],
  ])('%s meets AA only for large text and UI', (_name, foreground, background) => {
    const ratio = contrastRatio(foreground, background);
    expect(ratio).toBeGreaterThanOrEqual(AA_LARGE_TEXT_AND_UI);
    expect(ratio).toBeLessThan(AA_TEXT);
  });
});

describe('tokens.css', () => {
  it('mirrors every value in index.ts', () => {
    const css = readFileSync(new URL('./tokens.css', import.meta.url), 'utf8').toLowerCase();
    for (const [name, value] of Object.entries(colors)) {
      const cssName = name.replace(/(\d+)$/, '-$1').toLowerCase();
      expect(css, name).toContain(`--color-${cssName}: ${value.toLowerCase()};`);
    }
  });
});
