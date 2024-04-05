export function EasterEgg() {
  console.log(
    String.raw`%c
               ___                      __
              /\_ \                    /\ \
 __ __   ____ \//\ \      ___     ___  \ \ \/'\     __  __   _____
/\ '__\ /',__\  \ \ \    / __ \  / __ \ \ \ , <    /\ \/\ \ /\ '__ \
\ \ \/ /\__,  \  \_\ \_ /\ \_\ \/\ \_\ \ \ \ \ \ \ \ \ \_\ \\ \ \_\ \
 \ \_\ \/\____/  /\____\\ \____/\ \____/  \ \_\ \_\ \ \____/ \ \ ,__/
  \/_/  \/___/   \/____/ \/___/  \/___/    \/_/\/_/  \/___/   \ \ \/
                                                               \ \_\
                                                                \/_/`,
    "font-family:monospace; color: #ff0000; font-weight: bold; text-shadow: 2px 2px 0 #000;"
  );
  console.log(
    `%c
Hello there 👋
If you are reading this, you might be interested in the code behind this website.
Check it out at: https://github.com/ABSanthosh/rslookup.

You are more than welcome to contribute to the project! 🚀`,
    "font-size: 16px;"
  );
}
