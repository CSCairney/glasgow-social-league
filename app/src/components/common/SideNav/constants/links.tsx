import { NavLinks } from "../types/nav";

export const NavbarLinks: NavLinks = {
    links: [
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Contact",
            path: "/contact"
        },
        {
            name: "Dashboard",
            path: "/dashboard",
            subPaths: [
                {
                    name: "Customers",
                    path: "/dashboard/customers"
                },
                {
                    name: "Invoices",
                    path: "/dashboard/invoices"
                },
                {
                    name: "Stock",
                    path: "/dashboard/stock"
                },
            ]
        }
    ]
};
