export interface IResItem {
    name: string;
    type: "directory" | "file";
    contents: IResItem[];
}