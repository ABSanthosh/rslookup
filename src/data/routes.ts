export const ROUTES = [
  {
    icon: 59389,
    route: "prof",
    disabled: false,
    showSearch: true,
    name: "Professors",
    title: "Where's My Prof?",
    background: "linear-gradient(-45deg, #89f7fe 0%, #66a6ff 100%)",
    description:
      "Locate your professors on campus hassle-free. Say goodbye to wandering through hallways or frantically searching for room numbers.",
  },
  {
    icon: 59962,
    name: "Labs",
    route: "lab",
    disabled: false,
    showSearch: true,
    title: "Where's My Lab?",
    background: "linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%)",
    description:
      "Finding your designated lab spaces with ease. No more wandering around campus, feeling lost and bewildered.",
  },
  {
    icon: 59601,
    disabled: false,
    route: "amenity",
    name: "Amenities",
    showSearch: false,
    isAvailable: true,
    title: "Where's My Amenity?",
    background: "linear-gradient(-45deg, #2575fc 0%, #6a11cb 100%)",
    description:
      "Find every amenity on campus, from Academic Blocks to Cafeterias, all in one place.",
  },
  {
    icon: 62003,
    route: "student-council",
    disabled: false,
    showSearch: false,
    name: "Student Council",
    title: "Who's in Student Council?",
    background: "linear-gradient(225deg, #8D5CC8, #2D2856)",
    description:
      "Meet the Faces Behind Your Voice: Get to Know the Members of the Student Council!",
  },
  {
    icon: 59526,
    route: "clubs",
    disabled: false,
    showSearch: false,
    name: "Clubs",
    title: "What are the clubs?",
    background: "linear-gradient(225deg, #5AA63C, #ADD354)",
    description:
      "Discover the Heartbeat of Campus Life: Explore All University Clubs and Their Core Members at a Glance!",
  },
  {
    icon: 59507,
    route: "documents",
    disabled: false,
    showSearch: false,
    name: "Documents",
    title: "Where's My Document?",
    background: "linear-gradient(225deg, #3ABA33, #4CDFA5)",
    description:
      "Essential Resources at Your Fingertips: Access Crucial Documents ",
  },
  {
    icon: 59999,
    route: "gpa",
    disabled: false,
    showSearch: false,
    name: "GPA Calculator (Beta)",
    title: "What's My GPA?",
    background: "linear-gradient(90deg, #F24790, #984950)",
    description:
      "Estimate your academic growth with ease. No more manual calculations. (Not tested yet. Might not work as expected)",
  },
] as const;

export const HOME_ROUTES = [
  {
    name: "About",
    route: "about",
  },
  // {
  //   name: "Team",
  //   route: "team",
  // },
] as const;
