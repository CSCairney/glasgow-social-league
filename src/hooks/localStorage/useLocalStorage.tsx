"use client";
import { useAppDispatch } from "@/app/store";
import { getPersistedOverlaySettings } from "@/redux/stores/overlay/actions/overlay";
import React, {useEffect, useState} from "react";
import {getPersistedAccountDetails} from "@/redux/stores/account/actions/account";
import {getPersistedSportDetails} from "@/redux/stores/sport/actions/sport";
import {getPersistedSessionDetails} from "@/redux/stores/session/actions/session";

const useLocalStorage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const localStorageUpdateRedux = async () => {
        await dispatch(getPersistedOverlaySettings());
        await dispatch(getPersistedAccountDetails());
        await dispatch(getPersistedSportDetails());
        await dispatch(getPersistedSessionDetails());
    }

    useEffect(() => {
      setLoading(true);
      localStorageUpdateRedux().then(r => setLoading(false));
    }, [dispatch]);
      
    return {
        loading
    }
    }

export default useLocalStorage;