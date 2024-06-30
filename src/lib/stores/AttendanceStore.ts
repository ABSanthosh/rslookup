import { browser } from '$app/environment';
import { writable } from 'svelte/store';

interface IAttendance {
  code: string;
  lec: ISubject;
  tut: ISubject;
  pra: ISubject;
}

interface ISubject {
  attended: number;
  total: number;
  pending: number;
  hours: number;
}

const defaultValue: IAttendance[] = [
  {
    code: 'Course 1',
    lec: {
      attended: 0,
      total: 0,
      pending: 0,
      hours: 1
    },
    tut: {
      attended: 0,
      total: 0,
      pending: 0,
      hours: 1
    },
    pra: {
      attended: 0,
      total: 0,
      pending: 0,
      hours: 1
    }
  }
];

let initialValue = defaultValue;

if (browser && window.localStorage.getItem('Attendance')) {
  initialValue = JSON.parse(window.localStorage.getItem('Attendance')!);
}

const AttendanceStore = writable<IAttendance[]>(initialValue as IAttendance[]);
AttendanceStore.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('Attendance', JSON.stringify(value));
  }
});

export { AttendanceStore };
