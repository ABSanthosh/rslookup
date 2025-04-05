export default function userNamePlaceholder(name: string): string {
  return name
    .match(/(\b\S)?/g)!
    .join('')
    .match(/(^\S|\S$)?/g)!
    .join('')
    .toUpperCase();
}
