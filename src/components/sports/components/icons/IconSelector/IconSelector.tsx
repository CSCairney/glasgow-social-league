import {sportsLookup} from "@/helpers/sports/sports";
import {BadmintonIcon} from "@/components/sports/components/icons/Badminton/BadmintonIcon";
import {FootballIcon} from "@/components/sports/components/icons/Football/FootballIcon";
import React from "react";
import {MmaIcon} from "@/components/sports/components/icons/Mma/MmaIcon";
import {TennisIcon} from "@/components/sports/components/icons/Tennis/TennisIcon";
import {TableTennisIcon} from "@/components/sports/components/icons/TableTennis/TableTennisIcon";
import {SquashIcon} from "@/components/sports/components/icons/Squash/SquashIcon";
import {CallOfDutyIcon} from "@/components/sports/components/icons/CallOfDuty/CallOfDutyIcon";
import {HearthstoneIcon} from "@/components/sports/components/icons/Hearthstone/HearthstoneIcon";
import {RocketLeagueIcon} from "@/components/sports/components/icons/RocketLeague/RocketLeagueIcon";
import {ChessIcon} from "@/components/sports/components/icons/Chess/ChessIcon";

export type IconSelectorProps = {
    sportId: number;
    width: number;
    height: number;
}

export const IconSelector = (
    {
        sportId,
        width = 50,
        height = 50
    }: IconSelectorProps) => {
    const sportIdentity = sportsLookup[sportId];
    switch (sportIdentity) {
        case "Badminton":
            return (
                <BadmintonIcon
                    width={width}
                    height={height}
                />
            )
        case "Football":
            return (
                <FootballIcon
                    width={width}
                    height={height}
                />
            )
        case "MMA":
            return (
                <MmaIcon
                    width={width}
                    height={height}
                />
            )
        case "Tennis":
            return (
                <TennisIcon
                    width={width}
                    height={height}
                />
            )
        case "Table Tennis":
            return (
                <TableTennisIcon
                    width={width}
                    height={height}
                />
            )
        case "Squash":
            return (
                <SquashIcon
                    width={width}
                    height={height}
                />
            )
        case "Call of Duty":
            return (
                <CallOfDutyIcon
                    width={width}
                    height={height}
                />
            )
        case "Hearthstone":
            return (
                <HearthstoneIcon
                    width={width}
                    height={height}
                />
            )
        case "Rocket League":
            return (
                <RocketLeagueIcon
                    width={width}
                    height={height}
                />
            )
        case "Chess":
            return (
                <ChessIcon
                    width={width}
                    height={height}
                />
            )
    }
}