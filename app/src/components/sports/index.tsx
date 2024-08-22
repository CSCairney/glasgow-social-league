import React, { useEffect, useState } from 'react';
import { useSports } from "@/api/sports/useSports";
import styles from "./styles.module.scss";
import { Sport } from "@/components/sports/types";
import {useAppDispatch} from "@/app/store";
import {setSportDescription, setSportId, setSportName} from "@/redux/stores/sport";
import {useRouter} from "next/navigation";

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
        <div className={styles.container}>
            {sports ? (sports.map((sport) => (
                <button
                    key={sport.id}
                    className={styles.button}
                    onClick={() => handleSportClick(sport.id)}
                >
                    <h3 className={styles.name}>{sport.name}</h3>
                    <p className={styles.description}>{sport.description}</p>
                </button>
            ))) : (
                <p>Sports unable to be retrieved. Contact Support.</p>
            )}
        </div>
    );
};

export default SportsButtons;
