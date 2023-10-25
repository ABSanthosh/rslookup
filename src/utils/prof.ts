export const dept: {
  [key: string]: string;
} = {
  "Department Of Chemical Engineering": "DOCE",
  "Department Of Civil Engineering": "DOCE",
  "Department Of Computer Science And Engineering": "DOCSE",
  "Department Of Electrical Engineering": "DOEE",
  "Department Of Mechanical Engineering": "DOME",
  "Decision Sciences, Operations Management, And Information Systems": "DSOMIS",
  Doctoral: "DOCTORAL",
  "Economics And Public Policy": "EAPP",
  "Finance, Accounting And Control": "FAC",
  "General Management": "GM",
  "Marketing Management": "MM",
  "Organization Behavior And Human Resource Management": "OBHRM",
  "Strategy Management, Entrepreneurship And International Business": "SMEIB",
  "Department Of Chemistry": "DOC",
  "Department Of Life Sciences": "DOLS",
  "Department Of Mathematics": "DOM",
  "Department Of Physics": "DOP",
  "Department Of Art, Media And Performance": "DAMP",
  "Department Of Design": "DOD",
  "Department Of Economics": "DOE",
  "Department Of English": "DOENG",
  "Department Of History And Archaeology": "DOHA",
  "Department Of International Relations And Governance Studies": "DIRGS",
  "Department Of Sociology": "DOS",
};

export const schools: {
  [key: string]: {
    slug: string;
    color: string;
    departments: string[];
  };
} = {
  "School Of Engineering": {
    slug: "SOE",
    color: "blue",
    departments: [
      dept["Department Of Chemical Engineering"],
      dept["Department Of Civil Engineering"],
      dept["Department Of Computer Science And Engineering"],
      dept["Department Of Electrical Engineering"],
      dept["Department Of Mechanical Engineering"],
    ],
  },
  "School Of Management And Entrepreneurship": {
    slug: "SOME",
    color: "green",
    departments: [
      dept["Decision Sciences, Operations Management, And Information Systems"],
      dept["Doctoral"],
      dept["Economics And Public Policy"],
      dept["Finance, Accounting And Control"],
      dept["General Management"],
      dept["Marketing Management"],
      dept["Organization Behavior And Human Resource Management"],
      dept["Strategy Management, Entrepreneurship And International Business"],
    ],
  },
  "School Of Natural Sciences": {
    slug: "SONS",
    color: "yellow",
    departments: [
      dept["Department Of Chemistry"],
      dept["Department Of Life Sciences"],
      dept["Department Of Mathematics"],
      dept["Department Of Physics"],
    ],
  },
  "School Of Humanities And Social Sciences": {
    slug: "SOHSS",
    color: "red",
    departments: [
      dept["Department Of Art, Media And Performance"],
      dept["Department Of Design"],
      dept["Department Of Economics"],
      dept["Department Of English"],
      dept["Department Of History And Archaeology"],
      dept["Department Of International Relations And Governance Studies"],
      dept["Department Of Sociology"],
    ],
  },
};

export const profColors: {
  [key: string]: {
    primary: string;
    secondary: string;
  };
} = {
  blue: {
    primary: "var(--bluePrimary)",
    secondary: "var(--blueSecondary)",
  },
  green: {
    primary: "var(--greenPrimary)",
    secondary: "var(--greenSecondary)",
  },
  yellow: {
    primary: "var(--yellowPrimary)",
    secondary: "var(--yellowSecondary)",
  },
  red: {
    primary: "var(--redPrimary)",
    secondary: "var(--redSecondary)",
  },
  gray: {
    primary: "var(--grayPrimary)",
    secondary: "var(--graySecondary)",
  },
};
