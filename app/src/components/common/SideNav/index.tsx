import React from "react";
import styles from "./styles.module.scss";
import { IoHomeOutline } from "react-icons/io5";
import Navlink from "./NavLink";
import Link from "next/link";
import { NavLinks } from "@/components/common/SideNav/types/nav";

type SideNavProps = NavLinks & {
    nested?: boolean;
};

const SideNav: React.FC<SideNavProps> = ({ links, nested = false }) => {
    return (
        <div className={nested ? styles.sideNavNested : styles.sideNav}>
            {!nested && (
                <div className={styles.sideNav__branding}>
                    <Link className={styles.sideNav__brandingLink} href="/">
                        <IoHomeOutline className={styles.sideNav__brandingIcon} />
                    </Link>
                </div>
            )}
            <div className={styles.sideNav__links}>
                {links.map((link, index) => (
                    <Navlink
                        key={index}
                        name={link.name}
                        path={link.path}
                        subPaths={link.subPaths}
                    />
                ))}
            </div>
        </div>
    );
};

export default SideNav;
