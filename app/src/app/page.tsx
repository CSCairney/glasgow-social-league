"use client";
import styles from './page.module.css';
import {PageHeader} from "@/components/common/PageHeader";


export default function Home() {
    return (
        <>
            <main className={styles.main}>
                <PageHeader image={"/landing/MainHeader.jpg"} alt={"Landing Page header"} height={"Large"} className={styles.header}  />
                <div className={styles.description}>
                    <h2 className={styles.heading}>This is the starting page</h2>
                </div>
            </main>
        </>
    );
}
