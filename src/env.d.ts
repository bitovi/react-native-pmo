declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PMO_API: string
    }
  }
}
