type Rgb = readonly [number, number, number];

function parseHex(input: string): Rgb {
  const value = input.replace('#', '').trim();
  const full =
    value.length === 3
      ? value
          .split('')
          .map(channel => channel + channel)
          .join('')
      : value;

  if (!/^[0-9a-f]{6}$/i.test(full)) {
    throw new Error(`Invalid hex colour: ${input}`);
  }

  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ];
}

function linearChannel(channel: number): number {
  const value = channel / 255;
  return value <= 0.04045
    ? value / 12.92
    : Math.pow((value + 0.055) / 1.055, 2.4);
}

export function luminance(color: string): number {
  const [red, green, blue] = parseHex(color);
  return (
    0.2126 * linearChannel(red) +
    0.7152 * linearChannel(green) +
    0.0722 * linearChannel(blue)
  );
}

export function contrastRatio(foreground: string, background: string): number {
  const first = luminance(foreground);
  const second = luminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Picks ink or paper for text sitting on a supplied background.
 * Used for buttons, chips, badges and image overlays.
 */
export function readableOn(
  background: string,
  light = '#FFFFFF',
  dark = '#111827',
): string {
  return contrastRatio(light, background) >= contrastRatio(dark, background)
    ? light
    : dark;
}

export function alpha(color: string, opacity: number): string {
  const [red, green, blue] = parseHex(color);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

/**
 * Mixes a colour toward white.
 *
 * Used to build a readable tint of the configured brand colour for dark
 * surfaces, so a festival palette keeps its own hue in dark mode instead of
 * falling back to a hardcoded violet.
 */
export function tint(color: string, amount: number): string {
  const [red, green, blue] = parseHex(color);
  const ratio = Math.min(Math.max(amount, 0), 1);
  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * ratio)
      .toString(16)
      .padStart(2, '0');

  return `#${mix(red)}${mix(green)}${mix(blue)}`;
}

export function withContrast(
  color: string,
  background: string,
  fallback: string,
  minimum = 4.5,
): string {
  return contrastRatio(color, background) >= minimum ? color : fallback;
}
