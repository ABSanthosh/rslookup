import type { IResItem } from "../course";

// https://docs.google.com/viewer?url=
// https://raw.githubusercontent.com/programonaut/cv/main/build-files/cv-maximilian-kuerschner.pdf

const link =
  "https://raw.githubusercontent.com/ABSanthosh/rslookup/rs-data/resources.json";

export async function load({ url }: { url: URL }): Promise<{
  pwd: IResItem | null;
  status: number;
  isRoot: boolean;
  basePath: string;
  parentPath: string;
}> {
  const resources = await fetch(link);

  if (!resources.ok) {
    return {
      pwd: null,
      status: 404,
      isRoot: false,
      basePath: "",
      parentPath: "",
    };
  }

  let folderStructure: IResItem = (await resources.json())[0];
  folderStructure.name = "course";

  let keys = decodeURIComponent(url.pathname)
    .split("/")
    .filter((key) => key !== "");

  const level = keys.shift();
  if (level === "course" && keys.length === 0) {
    return {
      status: 200,
      isRoot: true,
      parentPath: "",
      basePath: "/",
      pwd: folderStructure,
    };
  }

  keys = decodeURIComponent(url.pathname)
    .split("/")
    .filter((key) => key !== "");

  keys.forEach((level) => {
    if (level === "course") return;
    folderStructure = folderStructure.contents.find(
      (item) => item.name === level
    )!;
  });
  keys.shift()

  return {
    status: 200,
    isRoot: false,
    basePath: `/${keys.join("/")}`,
    parentPath: url.pathname.split("/").slice(0, -1).join("/"),
    pwd: folderStructure,
  };
}
