"use client";
import styles from './page.module.css'
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
    useLocalStorage();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2 className={styles.heading}>This is the starting page</h2>
      </div>
    </main>
  )
}
