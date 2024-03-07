declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PUBLIC_PMO_API: string
    }
  }
}
