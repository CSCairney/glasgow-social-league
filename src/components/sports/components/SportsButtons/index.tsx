import React, { useEffect, useState } from 'react';
import { useSports } from "@/api/sports/useSports";
import styles from "./styles.module.scss";
import { Sport } from "@/components/sports/types";
import {useAppDispatch} from "@/app/store";
import {setSportDescription, setSportId, setSportName} from "@/redux/stores/sport";
import {useRouter} from "next/navigation";
import {BadmintonIcon} from "@/components/sports/components/icons/Badminton/BadmintonIcon";
import {sportsLookup} from "@/helpers/sports/sports";
import {FootballIcon} from "@/components/sports/components/icons/Football/FootballIcon";
import {IconSelector} from "@/components/sports/components/icons/IconSelector/IconSelector";

const SportsButtons: React.FC = () => {
    const { getAllSports } = useSports();
    const [sports, setSports] = useState<Sport[]>([]);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSportClick = (id: number) => {
        const sport = sports.find((sp) => sp.id === id);
        if (sport){
            dispatch(setSportId(sport.id));
            dispatch(setSportName(sport.name));
            dispatch(setSportDescription(sport.description));
            router.push(`/sports/${sport.id}`);
        }
    };

    useEffect(() => {
        const fetchSports = async () => {
            const sportsData = await getAllSports();
            setSports(sportsData);
        };

        fetchSports();
    }, []);

    return (
        <div className={styles.sportButtonContainer}>
            {sports ? (
                sports.map((sport) => (
                    <button
                        key={sport.id}
                        className={styles.button}
                        onClick={() => handleSportClick(sport.id)}
                    >
                        <div className={styles.sportIcon}>
                            <IconSelector sportId={sport.id} width={50} height={50} />
                        </div>
                        <div className={styles.sportDetails}>
                            <h2 className={styles.name}>{sport.name}</h2>
                            <p className={styles.description}>{sport.description}</p>
                        </div>
                    </button>
                ))
            ) : (
                <p>Sports unable to be retrieved. Contact Support.</p>
            )}
        </div>
    );
};

export default SportsButtons;
