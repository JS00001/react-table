import type { CSSProperties } from "react";

/**
 * An alias to an immediately invoked function expression (IIFE) to make the code more readable
 */
export function compute<T>(fn: () => T): T {
  return fn();
}

/**
 * Takes a list of styles and classes, and returns the style/class props for
 * a component
 */
export const styles = (
  ...styles: (string | undefined | boolean | CSSProperties | Record<string, string | number | undefined>)[]
) => {
  // Merge all styles into a single object
  const filteredStyles = styles.filter((style) => typeof style === "object" && style !== null);
  const cssStyles = filteredStyles.reduce((acc, style) => ({ ...acc, ...style }), {});

  // Get the latest className, remove duplicates
  const filteredClassNames = styles.filter((style) => typeof style === "string").join(" ");
  const individualClassNames = filteredClassNames.split(" ");
  const dedupedClassNames = [...new Map(individualClassNames.map((item) => [item, item])).values()];
  const className = dedupedClassNames.join(" ");

  return { style: cssStyles, className };
};
