import {render, screen} from '@testing-library/react-native';
import type {SharedValue} from 'react-native-reanimated';

import {normalConfig} from '../../config/variants/normal';
import type {SectionConfig} from '../../config/types';
import {SectionRenderer, type SectionEvents} from '../SectionRenderer';
import {parseServices} from '../parse';
import {ThemeProvider} from '../../theme/ThemeProvider';

const scrollY = {value: 0} as SharedValue<number>;

const events: SectionEvents = {
  onBookDoctor: jest.fn(),
  onBookService: jest.fn(),
  onQuickAction: jest.fn(),
  onBrowse: jest.fn(),
};

function renderSection(section: SectionConfig) {
  return render(
    <ThemeProvider config={normalConfig}>
      <SectionRenderer section={section} scrollY={scrollY} events={events} />
    </ThemeProvider>,
  );
}

const offer: SectionConfig = {
  id: 'offer-test',
  type: 'offer_strip',
  background: {kind: 'color', value: '#E3A23C'},
  items: [{id: 'offer', message: 'Free follow-up within 7 days'}],
};

describe('SectionRenderer', () => {
  it('renders an offer strip from config', () => {
    renderSection(offer);
    expect(screen.getByText('Free follow-up within 7 days')).toBeTruthy();
  });

  it('silently skips a section type this build does not know', () => {
    const future = {
      ...offer,
      id: 'future',
      type: 'festival_countdown',
    } satisfies SectionConfig;
    const tree = renderSection(future);
    expect(tree.toJSON()).toBeNull();
  });

  it('shows a usable fallback when a known section has no valid items', () => {
    renderSection({
      id: 'categories-empty',
      type: 'category_chips',
      title: 'Explore care',
      background: {kind: 'color', value: '#F4EFE6'},
      items: [{id: 'broken'}],
    });
    expect(
      screen.getByText('New care options are coming soon.'),
    ).toBeTruthy();
  });
});

describe('section parsers', () => {
  it('drops malformed items instead of crashing the home screen', () => {
    const section: SectionConfig = {
      ...offer,
      id: 'services',
      type: 'service_grid',
      items: [
        {
          id: 'checkup',
          name: 'Full body checkup',
          priceInr: 1499,
          imageUrl: 'https://example.com/care.jpg',
          doctorId: 'dr-ananya',
          doctorName: 'Dr. Ananya Rao',
          specialty: 'General Physician',
          feeInr: 500,
        },
        {id: 'missing-name', priceInr: 100},
      ],
    };

    const services = parseServices(section);
    expect(services).toHaveLength(1);
    expect(services[0]).toMatchObject({
      id: 'checkup',
      doctorName: 'Dr. Ananya Rao',
      specialty: 'General Physician',
      feeInr: 500,
    });
  });
});
