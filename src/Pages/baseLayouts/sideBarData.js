export const SideBarData = [
  {
    title: "Home",
    path: "/home",
  },

  {
    title: "Create",
    path: "/home/address-book-create",
  },

  {
    title: "Sign out",
    path: "/",
    onclick: () => {
      localStorage.removeItem("auth");
    },
  },
];
