/**
 * An alias to an immediately invoked function expression (IIFE) to make the code more readable
 */
export function compute<T>(fn: () => T): T {
  return fn();
}
