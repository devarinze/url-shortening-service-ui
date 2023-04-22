
export function isEmpty(val: string) {
  return val === undefined || val === null || !val;
}

export function isObjectEmpty(obj: any) {
  return !obj || (Object.keys(obj).length === 0);
}

export function isNullOrUndefined(value: any) {
  return isEmpty(value);
}

export function isArrayEmpty(arg: Array<any>): boolean {
  if (!arg) {
    return true;
  }
  return Array.isArray(arg) && arg.length === 0;
}

export function isArrayNotEmpty(arg: Array<any>): boolean {
  return Array.isArray(arg) && arg.length > 0;
}

export function isArray(val: any) {
  return Array.isArray(val) && val.length > 0;
}
