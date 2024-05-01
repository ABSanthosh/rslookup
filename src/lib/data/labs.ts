export interface ILab {
  name: string;
  room: string;
  block: string;
}

export const AcademicBlocks: {
  [key: string]: string;
} = {
  A: 'A Block',
  B: 'B Block',
  C: 'C Block',
  D: 'D Block'
};
