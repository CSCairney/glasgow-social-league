import styles from "./styles.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.dashboard}>
            <div>
                <p>List of all possible games.</p>
            </div>
            <div>{children}</div>
        </div>
    );
}