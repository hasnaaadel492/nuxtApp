export function env(key: string, defaultValue: any = null) {
  return import.meta.env[key] ?? defaultValue
}
