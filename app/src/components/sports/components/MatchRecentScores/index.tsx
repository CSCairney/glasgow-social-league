import { useMatches } from "@/api/sports/useMatches";
import { useEffect, useState, useCallback } from "react";
import { MatchResponseDTO } from "@/types/sports/match";
import { MatchQueryParams } from "@/types/matches";
import styles from './styles.module.scss';
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import {RootState, useAppSelector} from "@/app/store";
import {retrieveAccountName} from "@/helpers/accounts";

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
    const accounts = useAppSelector((state) => state.session.availableAccounts);
    const [matches, setMatches] = useState<MatchResponseDTO[]>([]);
    const { getAllMatches, loading } = useMatches();
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

    const duplicatedMatches = matches.concat(matches);

    return (
        <div className={`${styles.sliderContainer} ${styles[variant]} ${className}`}>
            <div className={`${styles.slidingBar} ${sliding ? styles.sliding : ''}`}>
                {duplicatedMatches.map((match, index) => (
                    <div key={`${match.id}-${index}`} className={styles.matchItem}>
                        <p>{retrieveAccountName(match.playerOneId, accounts)} {match.scorePlayerOne} - {match.scorePlayerTwo} {retrieveAccountName(match.playerTwoId, accounts)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
