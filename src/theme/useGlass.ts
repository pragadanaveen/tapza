import {Platform} from 'react-native';

import {useAppearanceStore} from '../store/appearanceStore';

export type GlassKind = 'panel' | 'bar' | 'sheet' | 'overlay';

/**
 * Android gets real GPU blur from API 31. Below that the library can fall back
 * to a CPU blur, which is only sensible for the two small floating surfaces.
 * iOS uses UIVisualEffectView throughout.
 */
export function useGlassEnabled(kind: GlassKind): boolean {
  const reduced = useAppearanceStore(
    store => store.reduceTransparency || store.systemReduceTransparency,
  );

  if (reduced) {
    return false;
  }

  if (Platform.OS !== 'android') {
    return true;
  }

  const api = Number(Platform.Version);
  return api >= 31 || kind === 'bar' || kind === 'sheet';
}
