import {z} from 'zod';

const hexColor = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Expected a hex colour');

const festivalSchema = z.object({
  name: z.string().min(1),
  greeting: z.string().min(1),
  bannerImageUrl: z.string().min(1),
});

const paletteSchema = z.object({
  background: hexColor,
  surface: hexColor,
  textPrimary: hexColor,
  textSecondary: hexColor,
});

const themeSchema = z.object({
  primary: hexColor,
  secondary: hexColor,
  accent: hexColor,
  ...paletteSchema.shape,
  dark: paletteSchema.optional(),
  festival: festivalSchema.optional(),
});

const tabSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  icon: z.string().min(1),
  screen: z.enum(['home', 'bookings', 'prescriptions', 'profile']),
});

const backgroundSchema = z.discriminatedUnion('kind', [
  z.object({kind: z.literal('color'), value: z.string().min(1)}),
  z.object({kind: z.literal('gradient'), value: z.string().min(1)}),
  z.object({kind: z.literal('image'), value: z.string().min(1)}),
]);

const sectionSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  background: backgroundSchema,
  title: z.string().optional(),
  items: z.array(z.unknown()),
});

/**
 * Remote configs are untrusted. The schema is deliberately tolerant about
 * section types and item shapes (so new sections can ship before an app
 * update) but strict about the fields the app needs to lay out a screen.
 */
export const LayoutConfigSchema = z.object({
  version: z.number(),
  theme: themeSchema,
  tabs: z.array(tabSchema).min(1),
  sections: z.array(sectionSchema),
});

export type LayoutConfigInput = z.input<typeof LayoutConfigSchema>;
