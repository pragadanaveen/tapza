require('react-native-gesture-handler/jestSetup');

jest.mock('@react-native-async-storage/async-storage', () => {
  const store = new Map();
  const mock = {
    getItem: jest.fn(async key => (store.has(key) ? store.get(key) : null)),
    setItem: jest.fn(async (key, value) => {
      store.set(key, value);
    }),
    removeItem: jest.fn(async key => {
      store.delete(key);
    }),
    clear: jest.fn(async () => {
      store.clear();
    }),
    getAllKeys: jest.fn(async () => [...store.keys()]),
  };

  return {__esModule: true, default: mock};
});

jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@sbaiahmed1/react-native-blur', () => ({
  BlurView: 'BlurView',
  default: 'BlurView',
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@notifee/react-native', () => {
  const AuthorizationStatus = {
    DENIED: 0,
    AUTHORIZED: 1,
    PROVISIONAL: 2,
    NOT_DETERMINED: 3,
  };

  return {
    __esModule: true,
    default: {
      createChannel: jest.fn(async () => 'dose-reminders'),
      requestPermission: jest.fn(async () => ({
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
      })),
      getPermissionSettings: jest.fn(async () => ({
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
      })),
      createTriggerNotification: jest.fn(async notification => notification.id),
      cancelNotification: jest.fn(async () => undefined),
      cancelAllNotifications: jest.fn(async () => undefined),
    },
    AndroidImportance: {HIGH: 4, DEFAULT: 3, LOW: 2, MIN: 1, NONE: 0},
    AuthorizationStatus,
    TriggerType: {TIMESTAMP: 0, INTERVAL: 1},
    RepeatFrequency: {NONE: 0, DAILY: 1, WEEKLY: 2, HOURLY: 3},
  };
});
