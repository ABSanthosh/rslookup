import { writable } from "svelte/store";

interface IToast {
  id?: number;
  message: string;
  timeout?: number;
}

export const ToastStore = writable<IToast[]>([]);

export const addToast = (toast: IToast) => {
  const id = Math.floor(Math.random() * 10000);

  ToastStore.update((all) => {
    if (all.length > 0) {
      dismissToast(all[0].id!);
      return [...all];
    }
    return [{ ...toast, id: id }, ...all];
  });
  if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: number) => {
  ToastStore.update((all) => all.filter((t) => t.id !== id));
};
