import React from 'react';
import styles from './styles.module.scss';
import { useAppDispatch } from "@/app/store";
import { clearSessionState } from "@/redux/stores/session";
import {useRouter} from "next/navigation";

const SessionStop: React.FC = () => {
    const dispatch = useAppDispatch();
    const router  = useRouter();

    const handleStopSession = () => {
        dispatch(clearSessionState());
        router.push("/");
        console.log('Session state cleared');
    };

    return (
        <button className={styles.sessionStopButton} onClick={handleStopSession}>
            Stop Session
        </button>
);
};

export default SessionStop;
