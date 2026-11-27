import {create} from 'zustand';

export type LatencyPreset = 'fast' | 'normal' | 'slow';

export type FailureMode =
  | 'none'
  | 'all'
  | 'config'
  | 'booking'
  | 'slotConflict';

export const LATENCY_MS: Record<LatencyPreset, number> = {
  fast: 120,
  normal: 650,
  slow: 2600,
};

type NetworkState = {
  latency: LatencyPreset;
  failureMode: FailureMode;
  emptyLists: boolean;
  setLatency: (latency: LatencyPreset) => void;
  setFailureMode: (mode: FailureMode) => void;
  setEmptyLists: (empty: boolean) => void;
  reset: () => void;
};

const DEFAULTS = {
  latency: 'normal' as LatencyPreset,
  failureMode: 'none' as FailureMode,
  emptyLists: false,
};

/**
 * Demo switches for the mock backend. Kept in its own store so the API can
 * read the current settings with `getState()` without any React coupling.
 */
export const useNetworkStore = create<NetworkState>(set => ({
  ...DEFAULTS,
  setLatency: latency => set({latency}),
  setFailureMode: failureMode => set({failureMode}),
  setEmptyLists: emptyLists => set({emptyLists}),
  reset: () => set(DEFAULTS),
}));
