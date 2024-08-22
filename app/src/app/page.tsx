"use client";
import styles from './page.module.css';


export default function Home() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.description}>
                    <h2 className={styles.heading}>This is the starting page</h2>
                </div>
            </main>
        </>
    );
}
