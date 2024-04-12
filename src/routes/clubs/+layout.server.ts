import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ url }) => {
  if (url.pathname === "/clubs") {
    throw redirect(308, "/clubs/cultural");
  }
};
