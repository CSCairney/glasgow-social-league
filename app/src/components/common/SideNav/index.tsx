import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import { IoHomeOutline } from "react-icons/io5";
import Navlink from "./NavLink";
import Link from "next/link";
import { NavLinks } from "@/components/common/SideNav/types/nav";
import Avatar from "@/components/common/Avatar";
import {RootState, useAppSelector} from "@/app/store";

type SideNavProps = NavLinks & {
    nested?: boolean;
};

const SideNav: React.FC<SideNavProps> = ({ links, nested = false }) => {
    const accountId = useAppSelector((state: RootState) => state.account.id);
    const [avatarSize, setAvatarSize] = useState<number>(20);

    const updateAvatarSize = () => {
        const width = window.innerWidth;
        if (width > 1200) {
            setAvatarSize(50);
        } else if (width > 800) {
            setAvatarSize(40);
        } else if (width > 600){
            setAvatarSize(30);
        } else {
            setAvatarSize(20);
        }
    };

    useEffect(() => {
        updateAvatarSize();
        window.addEventListener("resize", updateAvatarSize);

        return () => {
            window.removeEventListener("resize", updateAvatarSize);
        };
    }, []);

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
            {!nested && accountId && (
                <Avatar className={styles.avatar} accountId={accountId.toString()} size={avatarSize} />
            )}
        </div>
    );
};

export default SideNav;
