import {type StyleProp, type TextStyle} from 'react-native';

import {useCommonStyles} from '../styles';
import {AppText} from './AppText';

type PriceProps = {
  amount: number;
  muted?: boolean;
  style?: StyleProp<TextStyle>;
};

function formatInr(amount: number): string {
  try {
    return `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
  } catch {
    return `₹${amount}`;
  }
}

export function Price({amount, muted = false, style}: PriceProps) {
  const styles = useCommonStyles();

  return (
    <AppText
      variant="label"
      style={[styles.price, muted && styles.priceMuted, style]}>
      {formatInr(amount)}
    </AppText>
  );
}
