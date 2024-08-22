import { NavLinks } from "../types/nav";

export const NavbarLinks: NavLinks = {
    links: [
        {
            name: "Sports",
            path: "/sports"
        },
        {
            name: "History",
            path: "/history"
        },
        {
            name: "Dashboard",
            path: "/dashboard",
            // subPaths: [
            //     {
            //         name: "Stats",
            //         path: "/dashboard/stats"
            //     },
            // ]
        }
    ]
};
