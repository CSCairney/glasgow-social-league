export type NavLink = {
    name: string;
    path: string;
    subPaths?: NavLink[];
};

export type NavLinks = {
    links: NavLink[];
};