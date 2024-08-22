import { NavLinks } from "../types/nav";

export const NavbarLinks: NavLinks = {
    links: [
        {
            name: "Games",
            path: "/games"
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Dashboard",
            path: "/dashboard",
            subPaths: [
                {
                    name: "Stats",
                    path: "/dashboard/stats"
                },
            ]
        }
    ]
};
