import {DEFAULT_CONFIG, VARIANTS} from '..';
import {normalConfig} from '../variants/normal';
import {pongalConfig} from '../variants/pongal';
import {LayoutConfigSchema} from '../schema';

describe('LayoutConfigSchema', () => {
  it('accepts both shipped configs', () => {
    expect(LayoutConfigSchema.safeParse(normalConfig).success).toBe(true);
    expect(LayoutConfigSchema.safeParse(pongalConfig).success).toBe(true);
  });

  it('keeps the two configs meaningfully different', () => {
    expect(normalConfig.theme.primary).not.toBe(pongalConfig.theme.primary);
    expect(normalConfig.sections.map(section => section.id)).not.toEqual(
      pongalConfig.sections.map(section => section.id),
    );
    expect(normalConfig.tabs.map(tab => tab.screen)).not.toEqual(
      pongalConfig.tabs.map(tab => tab.screen),
    );
    expect(pongalConfig.theme.festival?.name).toBe('Pongal');
  });

  it('rejects an unsafe colour before it reaches a component', () => {
    const broken = {
      ...normalConfig,
      theme: {...normalConfig.theme, primary: 'red'},
    };
    const result = LayoutConfigSchema.safeParse(broken);
    expect(result.success).toBe(false);
  });

  it('rejects a tab that points at a screen this build does not have', () => {
    const broken = {
      ...normalConfig,
      tabs: [{id: 'labs', label: 'Labs', icon: 'flask', screen: 'labs'}],
    };
    expect(LayoutConfigSchema.safeParse(broken).success).toBe(false);
  });

  it('tolerates future section types and item shapes', () => {
    const future = {
      ...normalConfig,
      sections: [
        ...normalConfig.sections,
        {
          id: 'countdown',
          type: 'festival_countdown',
          background: {kind: 'gradient', value: '#000000,#111111'},
          items: [{anything: true}],
        },
      ],
    };
    expect(LayoutConfigSchema.safeParse(future).success).toBe(true);
  });

  it('exposes the bundled defaults used offline', () => {
    expect(DEFAULT_CONFIG).toBe(VARIANTS.normal.config);
    expect(VARIANTS.pongal.config.theme.festival?.greeting).toBe(
      'Happy Pongal',
    );
  });
});
