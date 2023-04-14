export const SideBarData = [
  {
    title: "Home",
    path: "/home",
  },

  {
    title: "Create",
    path: "/home/create",
  },

  {
    title: "Sign out",
    path: "/",
    onclick: () => {
      localStorage.removeItem("auth");
    },
  },
];
