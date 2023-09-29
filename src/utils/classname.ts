/**
 * @param classNames
 * List of classnames to be joined
 * @returns string
 */
export default function cn(
    ...classNames: (string | undefined | null | false | number)[]
  ) {
    return classNames.filter(Boolean).join(" ");
  }
  