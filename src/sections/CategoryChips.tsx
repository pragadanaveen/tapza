import {useState} from 'react';
import {ScrollView} from 'react-native';

import type {SectionConfig} from '../config/types';
import {Chip} from '../ui/components';
import {useSectionStyles} from '../ui/styles';
import {parseCategories} from './parse';

type CategoryChipsProps = {
  section: SectionConfig;
};

export function CategoryChips({section}: CategoryChipsProps) {
  const styles = useSectionStyles();
  const items = parseCategories(section);
  const [selected, setSelected] = useState<string | null>(null);

  if (items.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.horizontalScroll}
      contentContainerStyle={styles.horizontalContent}>
      {items.map(item => (
        <Chip
          key={item.id}
          label={item.label}
          icon={item.icon}
          selected={selected === item.id}
          onPress={() =>
            setSelected(current => (current === item.id ? null : item.id))
          }
        />
      ))}
    </ScrollView>
  );
}
