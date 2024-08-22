import styles from "./styles.module.scss";
import SideNav from "@/components/common/SideNav";
import {SportLinks} from "@/components/common/SideNav/constants/links";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.page}>
            <SideNav links={SportLinks("").links}/>
            <div>{children}</div>
        </div>
    );
}