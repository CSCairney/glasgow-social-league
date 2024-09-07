"use client";
import styles from './page.module.scss';
import {PageHeader} from "@/components/common/PageHeader";
import {WelcomeHero} from "@/components/landing/WelcomeHero";
import {MatchRecentScores} from "@/components/sports/components/MatchRecentScores";
import {useAppSelector} from "@/app/store";
import {useAccounts} from "@/api/accounts/useAccounts";
import {useDispatch} from "react-redux";
import {setAvailableAccounts} from "@/redux/stores/session";
import {useEffect} from "react";


export default function Home() {
    const { getAllAccounts } = useAccounts();
    const dispatch = useDispatch();

    const fetchAccounts = async () => {
        try {
            const accounts = await getAllAccounts();
            dispatch(setAvailableAccounts(accounts));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

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
