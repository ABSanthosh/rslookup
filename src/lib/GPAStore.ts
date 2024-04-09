import { writable } from "svelte/store";
import { browser } from "$app/environment";

// [
//   {
//     title: "Semester 1",
//     SGPA: 0,
//     courses: [
//       {
//         name: "Course 1",
//         credits: 1,
//         grade: "A",
//       },
//     ],
//   },
// ];

interface IGPA {
  title: string;
  SGPA: number;
  courses: ICourse[];
}

interface ICourse {
  name: string;
  credits: number;
  grade: string;
}

const defaultValue = [
  {
    title: "Semester 1",
    SGPA: 0,
    courses: [
      {
        name: "Course 1",
        credits: 1,
        grade: "A",
      },
    ],
  },
];

// const initialValue = browser
//   ? window.localStorage.getItem("GPA") ? JSON.parse(window.localStorage.getItem("GPA"))
//   : defaultValue;

let initialValue = defaultValue;

if (browser && window.localStorage.getItem("GPA")) {
  initialValue = JSON.parse(window.localStorage.getItem("GPA")!);
}

const GPAStore = writable<IGPA[]>(initialValue as IGPA[]);
GPAStore.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("GPA", JSON.stringify(value));
  }
});

export { GPAStore };
