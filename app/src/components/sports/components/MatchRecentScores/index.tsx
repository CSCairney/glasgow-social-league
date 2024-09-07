import { useMatches } from "@/api/sports/useMatches";
import { useEffect, useState, useRef, useCallback } from "react";
import { MatchResponseDTO } from "@/types/sports/match";
import { MatchQueryParams } from "@/types/matches";
import styles from './styles.module.scss';
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import {useAppSelector} from "@/app/store";

export type MatchRecentScoresProps = {
    amount: number;
    sportId?: number;
    sliding?: boolean;
    variant?: 'primary' | 'secondary' | 'accent';
    className?: string;
}

export const MatchRecentScores = (
    { amount, sportId, sliding = false, variant = 'primary', className }: MatchRecentScoresProps
) => {
    const [matches, setMatches] = useState<MatchResponseDTO[]>([]);
    // const sessionAvailableAccounts = useAppSelector(state => state.session.availableAccounts);
    const { getAllMatches, loading } = useMatches();
    const slidingBarRef = useRef<HTMLDivElement>(null);
    const params: MatchQueryParams = { amount, sportId };

    const retrieveRecentMatches = useCallback(async () => {
        try {
            const fetchedMatches = await getAllMatches(params);
            if (fetchedMatches.length > 0) {
                setMatches(fetchedMatches);
            }
        } catch (error) {
            toast.error('Failed to fetch recent sessions');
        }
    }, [getAllMatches, params]);

    useEffect(() => {
        retrieveRecentMatches();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className={`${styles.sliderContainer} ${styles[variant]} ${className}`}>
            <div className={`${styles.slidingBar} ${sliding ? styles.sliding : ''}`} ref={slidingBarRef}>
                {matches.map(match => (
                    <div key={match.id} className={styles.matchItem}>
                        <p>{match.scorePlayerOne} - {match.scorePlayerTwo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
