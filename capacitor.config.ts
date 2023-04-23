import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.grangeMobileKaran.app',
  appName: 'grange-mobile-app',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },

    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '446380689792-1epieubs0ehbls3rsvab4kvbpqccgfpv.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },

  server: {
    url: 'http://localhost:8100',
    cleartext: true,
  },
};

export default config;
