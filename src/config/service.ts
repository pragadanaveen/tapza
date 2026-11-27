import AsyncStorage from '@react-native-async-storage/async-storage';

import {fetchConfig} from '../api/client';
import {DEFAULT_CONFIG, DEFAULT_VARIANT} from './index';
import {LayoutConfigSchema} from './schema';
import type {ConfigVariant, LayoutConfig} from './types';

const CACHE_KEY = '@tapza/config-cache-v1';

type CacheEntry = {
  savedAt: string;
  config: LayoutConfig;
};

type CacheFile = {
  version: 1;
  entries: Partial<Record<ConfigVariant, CacheEntry>>;
};

export type ConfigSource = 'remote' | 'cache' | 'fallback';

export type LoadConfigResult = {
  config: LayoutConfig;
  variant: ConfigVariant;
  source: ConfigSource;
  savedAt: string | null;
  error: string | null;
};

function messageOf(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Something went wrong while loading the config.';
}

function isEntry(value: unknown): value is CacheEntry {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const entry = value as {savedAt?: unknown; config?: unknown};
  return (
    typeof entry.savedAt === 'string' &&
    LayoutConfigSchema.safeParse(entry.config).success
  );
}

async function readCacheFile(): Promise<CacheFile> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) {
      return {version: 1, entries: {}};
    }
    const parsed = JSON.parse(raw) as Partial<CacheFile>;
    if (!parsed || typeof parsed !== 'object' || !parsed.entries) {
      return {version: 1, entries: {}};
    }
    return {
      version: 1,
      entries: parsed.entries as CacheFile['entries'],
    };
  } catch {
    return {version: 1, entries: {}};
  }
}

/**
 * Last good config first for the exact variant, then the most recently saved
 * variant so an offline launch still opens with a familiar theme.
 */
export async function readCachedConfig(
  variant: ConfigVariant,
): Promise<{entry: CacheEntry; variant: ConfigVariant} | null> {
  const file = await readCacheFile();
  const exact = file.entries[variant];
  if (isEntry(exact)) {
    return {entry: exact, variant};
  }

  const candidates = (Object.keys(file.entries) as ConfigVariant[])
    .map(key => {
      const entry = file.entries[key];
      return isEntry(entry) ? {variant: key, entry} : null;
    })
    .filter((item): item is {variant: ConfigVariant; entry: CacheEntry} =>
      Boolean(item),
    )
    .sort(
      (first, second) =>
        new Date(second.entry.savedAt).getTime() -
        new Date(first.entry.savedAt).getTime(),
    );

  return candidates[0] ?? null;
}

export async function saveCachedConfig(
  variant: ConfigVariant,
  config: LayoutConfig,
): Promise<string> {
  const savedAt = new Date().toISOString();
  const file = await readCacheFile();
  file.entries[variant] = {savedAt, config};

  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(file));
  } catch {
    // A cache write failure must never stop the app from opening.
  }

  return savedAt;
}

export async function clearConfigCache(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
  } catch {
    // Best-effort clear only.
  }
}

/**
 * GET /config → validate → cache.
 *
 * On failure we prefer the last good saved copy; if there is none, the
 * bundled Everyday config keeps the app usable and the caller surfaces a
 * "using defaults" banner.
 */
export async function loadConfig(
  variant: ConfigVariant,
): Promise<LoadConfigResult> {
  try {
    const remote = await fetchConfig(variant);
    const config = LayoutConfigSchema.parse(remote);
    const savedAt = await saveCachedConfig(variant, config);
    return {
      config,
      variant,
      source: 'remote',
      savedAt,
      error: null,
    };
  } catch (error) {
    const cached = await readCachedConfig(variant);
    if (cached) {
      return {
        config: cached.entry.config,
        variant: cached.variant,
        source: 'cache',
        savedAt: cached.entry.savedAt,
        error: messageOf(error),
      };
    }

    return {
      config: DEFAULT_CONFIG,
      variant: DEFAULT_VARIANT,
      source: 'fallback',
      savedAt: null,
      error: messageOf(error),
    };
  }
}
