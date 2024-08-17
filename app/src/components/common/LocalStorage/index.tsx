"use client";
import { useAppDispatch } from "@/app/store";
import { getPersistedOverlaySettings } from "@/redux/stores/overlay/actions/overlay";
import React, { useEffect } from "react";

const LocalStorage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getPersistedOverlaySettings());
    }
      , [dispatch]);
      
    return (
        <></>
    )
    }

export default LocalStorage;