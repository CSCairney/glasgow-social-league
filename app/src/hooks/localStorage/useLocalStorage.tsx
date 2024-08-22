"use client";
import { useAppDispatch } from "@/app/store";
import { getPersistedOverlaySettings } from "@/redux/stores/overlay/actions/overlay";
import React, { useEffect } from "react";
import {getPersistedAccountDetails} from "@/redux/stores/account/actions/account";
import {getPersistedSportDetails} from "@/redux/stores/sport/actions/sport";

const useLocalStorage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getPersistedOverlaySettings());
      dispatch(getPersistedAccountDetails());
      dispatch(getPersistedSportDetails());
    }
      , [dispatch]);
      
    return {
    }
    }

export default useLocalStorage;