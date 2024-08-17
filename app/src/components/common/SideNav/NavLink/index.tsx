"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { NavLink } from "../types/nav";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type NavlinkProps = {
    name: string;
    path: string;
    subPaths?: NavLink[];
};

const Navlink: React.FC<NavlinkProps> = ({ name, path, subPaths }) => {
    const [subPathsOpen, setSubPathsOpen] = useState(false);

    const toggleSubPaths = () => {
        setSubPathsOpen(!subPathsOpen);
    };

    return (
        <div className={styles.subLinks}>
            <div className={styles.container}>
                <Link href={path} className={styles.link}>
                    {name}
                </Link>
                {subPaths ? subPathsOpen ? <IoIosArrowUp className={styles.subPathToggle} onClick={() => toggleSubPaths()} /> : <IoIosArrowDown className={styles.subPathToggle} onClick={() => toggleSubPaths()} /> : null}
            </div>
            {subPaths && subPathsOpen && (
                <div className={styles.subpaths}>
                    <ul className={styles.subPathList}>
                        {subPaths.map((subPath, index) => (
                            <li key={index} className={styles.link}>
                                <Link href={subPath.path} className={styles.link}>
                                    {subPath.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navlink;
