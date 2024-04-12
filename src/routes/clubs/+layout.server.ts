import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

// @ts-ignore
export const load: LayoutServerLoad = ({ url }) => {
  if (url.pathname === "/clubs") {
    redirect(308, "/clubs/cultural");
  }
};
