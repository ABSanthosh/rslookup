// See https://kit.svelte.dev/docs/types#app

import type { User } from "$types/db/User.type";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    interface Locals {
      user: User | null;
    }
  }
  namespace svelteHTML {
    interface HTMLAttributes<T> {
      onOutClick?: () => any;
    }
  }

  interface ViewTransition {
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  }

  interface Document {
    startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
  }
}

export {};
