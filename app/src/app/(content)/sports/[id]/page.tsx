"use client";
import React from "react";
import {useAppSelector} from "@/app/store";

const SelectedSport = () => {
    const selectedSport = useAppSelector(state => state.sport.name);
    return (
        <div>
            <h1>Sport: {selectedSport}</h1>
        </div>
    );
}

export default SelectedSport;