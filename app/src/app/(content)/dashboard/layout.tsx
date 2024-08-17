import styles from "./styles.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.dashboard}>
      <div>
        <p>This is to show the dynamic page layout for the dashboard.</p>
      </div>
      <div>{children}</div>
    </div>
  );
}