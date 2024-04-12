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
    separator: false,
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
    separator: false,
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
    separator: false,
  },
  {
    icon: 59999,
    route: "gpa",
    disabled: false,
    showSearch: false,
    name: "GPA Calculator",
    title: "What's My GPA?",
    background: "linear-gradient(90deg, #F24790, #984950)",
    description:
      "Estimate your academic growth with ease. No more manual calculations.",
    separator: false,
  },
  {
    icon: 60144,
    route: "attendance",
    disabled: false,
    showSearch: false,
    name: "Attendance Calculator",
    title: "What's My Attendance?",
    background: "linear-gradient(225deg, #CC8820, #B629E1)",
    description:
      "Missed a few classes? Calculate your attendance to know where you stand.",
    separator: false,
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
    separator: true,
  },
  {
    icon: 62874,
    route: "acad-helpdesk",
    disabled: false,
    showSearch: false,
    name: "Academic Helpdesk",
    title: "Who's in Academic POCs?",
    background: "linear-gradient(45deg, #E78888, #1C3AE2)",
    description:
      "Find all the Academic POCs in one place. Get your academic queries resolved in no time.",
    separator: false,
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
      "Essential Resources at Your Fingertips: Access Crucial Documents",
    separator: false,
  },
  {
    icon: 59526,
    route: "clubs/cultural",
    disabled: false,
    showSearch: false,
    name: "Clubs",
    title: "What are the clubs?",
    background: "linear-gradient(225deg, #5AA63C, #ADD354)",
    description:
      "Discover the Heartbeat of Campus Life: Explore All University Clubs and Their Core Members at a Glance!",
    separator: true,
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
