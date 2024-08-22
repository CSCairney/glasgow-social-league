import React from 'react';
import styles from './styles.module.scss';

interface DividerProps {
    color?: string;
}

const Divider: React.FC<DividerProps> = ({ color = '#FFF8EE' }) => {
    return (
        <div className={styles.divider} style={{ backgroundColor: color }} />
    );
};

export default Divider;
