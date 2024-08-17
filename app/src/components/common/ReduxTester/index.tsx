"use client";
import { useAppDispatch } from "@/app/store";
import { setErrorMessage } from "@/redux/stores/overlay";
import React from "react";

const ReduxTester = () => {
    const [messageNumber, setMessageNumber] = React.useState<number>(0);
    const dispatch = useAppDispatch();

    const reduxTestingHandler = (message: string) => {
        dispatch(setErrorMessage(message));
        setMessageNumber(messageNumber + 1);
    }

    return (
        <button onClick={() => reduxTestingHandler(`Testing Number: ${messageNumber}`)}>Redux Testing</button>
    )
    }

export default ReduxTester;