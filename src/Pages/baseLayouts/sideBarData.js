export const SideBarData = [
  {
    title: "Home",
    path: "/home",
  },

  {
    title: "Create",
    path: "/home",
  },

  {
    title: "Sign out",
    path: "/",
    onclick: () => {
      localStorage.removeItem("auth");
    },
  },
];
