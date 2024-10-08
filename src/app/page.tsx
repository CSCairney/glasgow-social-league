"use client";
import styles from './page.module.scss';
import {PageHeader} from "@/components/common/PageHeader";
import {WelcomeHero} from "@/components/landing/WelcomeHero";
import {MatchRecentScores} from "@/components/sports/components/MatchRecentScores";


export default function Home() {
    return (
        <>
            <main className={styles.main}>
                <PageHeader image={"/landing/MainHeader.jpg"} alt={"Landing Page header"} height={"Large"} className={styles.header}  />
                <MatchRecentScores amount={10} variant={"primary"} />
                <WelcomeHero className={styles.welcome} />
            </main>
        </>
    );
}
