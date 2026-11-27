import {Image, View, type StyleProp, type ViewStyle} from 'react-native';

import {useCommonStyles} from '../styles';
import {AppText} from './AppText';

type AvatarProps = {
  uri?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
};

function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({uri, name, size = 'md', style}: AvatarProps) {
  const styles = useCommonStyles();
  const sizeStyle =
    size === 'sm' ? styles.avatarSm : size === 'lg' ? styles.avatarLg : null;

  return (
    <View style={[styles.avatar, sizeStyle, style]}>
      {uri ? (
        <Image source={{uri}} style={styles.avatarImage} />
      ) : (
        <AppText variant="label" style={styles.avatarText}>
          {initials(name)}
        </AppText>
      )}
    </View>
  );
}
