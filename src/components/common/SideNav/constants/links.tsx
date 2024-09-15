import {NavLink, NavLinks} from "../types/nav";

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

export const SportLinks = (sportId: string): NavLinks => {

    const links: NavLink[] = [
        {
            name: "Rules",
            path: `/sports/${sportId}/rules`
        },
        {
            name: "Matches",
            path: `/sports/${sportId}/matches`
        },
        {
            name: "Champions",
            path: `/sports/${sportId}/champions`,
        }
    ];

    return { links };
}


