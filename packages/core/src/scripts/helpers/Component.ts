export function makeId(prefix: string): string {
  return `${prefix}-${Math.floor(Math.random() * 1e10)}`;
}
