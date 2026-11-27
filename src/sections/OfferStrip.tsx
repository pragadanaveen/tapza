import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {SectionConfig} from '../config/types';
import type {SectionTone} from '../ui/components';
import {AppText} from '../ui/components';
import {useSectionStyles} from '../ui/styles';
import {parseOffer} from './parse';

type OfferStripProps = {
  section: SectionConfig;
  tone: SectionTone;
};

export function OfferStrip({section, tone}: OfferStripProps) {
  const styles = useSectionStyles();
  const offer = parseOffer(section);

  if (!offer) {
    return null;
  }

  return (
    <View style={styles.offerRow}>
      <View
        style={[styles.offerIconWrap, {backgroundColor: tone.chip}]}>
        <Ionicons name="megaphone" size={16} color={tone.text} />
      </View>
      <AppText
        variant="label"
        style={[styles.offerMessage, {color: tone.text}]}>
        {offer.message}
      </AppText>
    </View>
  );
}
