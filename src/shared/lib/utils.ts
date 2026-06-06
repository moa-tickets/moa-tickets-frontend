/**
 * Utility functions for the application
 */

/**
 * Combines class names, filtering out falsy values.
 * For more advanced usage consider adding the `clsx` and `tailwind-merge` packages.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
