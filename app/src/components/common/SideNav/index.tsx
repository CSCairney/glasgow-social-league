import React from "react";
import styles from "./styles.module.scss";
import { NavbarLinks } from "./constants/links";
import { IoHomeOutline } from "react-icons/io5";
import Navlink from "./NavLink";
import Link from "next/link";

const SideNav = () => {

    return (
        <div className={styles.sideNav}>
            <div className={styles.sideNav__branding}>
                <Link className={styles.sideNav__brandingLink} href="/">
                    <IoHomeOutline className={styles.sideNav__brandingIcon} />
                </Link>
            </div>
            <div className={styles.sideNav__links}>
                {NavbarLinks.links.map((link, index) => (
                    <Navlink key={index} name={link.name} path={link.path} subPaths={link.subPaths} />
                ))}
            </div>
        </div>
    );
}

export default SideNav;
