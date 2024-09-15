"use client";
import styles from "./styles.module.scss";
import SideNav from "@/components/common/SideNav";
import {SportLinks} from "@/components/common/SideNav/constants/links";
import {useAppSelector} from "@/app/store";
import Divider from "@/components/common/Divider";

export default function Layout({ children }: { children: React.ReactNode }) {
    const selectedSportId = useAppSelector(state => state.sport.id);
    return (
        <div className={styles.page}>
            <SideNav nested links={SportLinks(selectedSportId? selectedSportId.toString() : "1").links}/>
            <div>{children}</div>
        </div>
    );
}