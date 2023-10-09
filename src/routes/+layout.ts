export const load = ({ url }: { url: URL }) => {
  const { pathname } = url;

  return {
    pathname,
  };
};
