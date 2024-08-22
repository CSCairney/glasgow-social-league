"use client";
import { useAppDispatch } from "@/app/store";
import { getPersistedOverlaySettings } from "@/redux/stores/overlay/actions/overlay";
import React, { useEffect } from "react";
import {getPersistedAccountDetails} from "@/redux/stores/account/actions/account";

const useLocalStorage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getPersistedOverlaySettings());
      dispatch(getPersistedAccountDetails());
    }
      , [dispatch]);
      
    return {
    }
    }

export default useLocalStorage;