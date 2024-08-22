import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useSports } from "@/api/sports/useSports";
import { Sport } from "@/components/sports/types";

const SportsButtons: React.FC = () => {
    const { getAllSports } = useSports();
    const [sports, setSports] = useState<Sport[]>([]);

    const handleSportClick = (id: number) => {
        console.log(`Sport ID clicked: ${id}`);
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
            {sports.map((sport) => (
                <button
                    key={sport.id}
                    className={styles.button}
                    onClick={() => handleSportClick(sport.id)}
                >
                    <h3 className={styles.name}>{sport.name}</h3>
                    <p className={styles.description}>{sport.description}</p>
                </button>
            ))}
        </div>
    );
};

export default SportsButtons;
