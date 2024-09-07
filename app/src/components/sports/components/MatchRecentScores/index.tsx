import { useMatches } from "@/api/sports/useMatches";
import { useEffect, useState, useCallback } from "react";
import { MatchResponseDTO } from "@/types/sports/match";
import { MatchQueryParams } from "@/types/matches";
import styles from './styles.module.scss';
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import {accountNameFromId, retrieveAccountName} from "@/helpers/accounts";

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
    const [loading, setLoading] = useState(false);
    const { getAllMatches } = useMatches();
    const params: MatchQueryParams = { amount, sportId };

    const retrieveRecentMatches = useCallback(async () => {
        try {
            setLoading(true);
            const fetchedMatches = await getAllMatches(params);
            if (fetchedMatches.length > 0) {
                setMatches(fetchedMatches);
            }
            setLoading(false);
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
                        <p>{accountNameFromId[match.playerOneId]} {match.scorePlayerOne} - {match.scorePlayerTwo} {accountNameFromId[match.playerTwoId]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
