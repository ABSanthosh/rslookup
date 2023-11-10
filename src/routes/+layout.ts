export const load = ({ url }: { url: URL }) => {
  const { pathname } = url;

  return {
    pathname: decodeURIComponent(pathname)
      .split("/")
      .filter((key) => key !== "")[0],
  };
};
