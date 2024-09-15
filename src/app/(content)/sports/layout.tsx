import styles from "./styles.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.page}>
            <div>{children}</div>
        </div>
    );
}