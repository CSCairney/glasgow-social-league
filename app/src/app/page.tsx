"use client";
import styles from './page.module.css';
import useLocalStorage from "@/hooks/localStorage/useLocalStorage";
import { useEffect } from "react";
import { useAuthToken } from "@/hooks";
import { useRouter } from "next/navigation";

export default function Home() {
    useLocalStorage();
    const router = useRouter();
    const token = useAuthToken();

    useEffect(() => {
        if (!token) {
            // Set a flag in localStorage before redirecting
            localStorage.setItem('redirected', 'true');
            router.push("/login");
        }
    }, [token, router]);

    if (!token) {
        return <div>Redirecting to login...</div>;
    }

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <h2 className={styles.heading}>This is the starting page</h2>
            </div>
        </main>
    );
}
