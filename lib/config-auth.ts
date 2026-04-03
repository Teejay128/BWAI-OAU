export const CONFIG_AUTH_HEADER = "x-config-code";

export function isValidConfigCode(code: string | null | undefined): boolean {
  const expected = process.env.CONFIG_ACCESS_CODE;

  if (!expected) {
    return false;
  }

  return Boolean(code) && code === expected;
}
