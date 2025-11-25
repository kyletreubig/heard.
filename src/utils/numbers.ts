export function ensureInt(value: number | string): number {
  return typeof value === "string" ? parseInt(value, 10) : value;
}
