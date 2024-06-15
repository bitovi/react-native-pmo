/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly EXPO_PUBLIC_PMO_API: string
      readonly EXPO_PUBLIC_PMO_ASSETS: string
      readonly EXPO_PUBLIC_GOOGLE_MAPS_API_KEY: string
      readonly EXPO_PUBLIC_GOOGLE_OAUTH_WEB_CLIENT_ID: string
      readonly EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID: string
    }
  }
}

export {}
