export type NullableClass = string | false | null | undefined;

export function cn(...classes: NullableClass[]): string {
  return classes.filter(Boolean).join(" ");
}
