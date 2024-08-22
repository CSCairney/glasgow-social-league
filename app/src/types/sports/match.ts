export type Match = {
    id: number;
    playerOneId: string;  // UUID of player one
    playerTwoId: string;  // UUID of player two
    scorePlayerOne: number;
    scorePlayerTwo: number;
    winnerId: string | null;  // UUID of the winner, can be null if no winner yet
    details: string;
    createdById: string;  // UUID of the account who created the match
    lastUpdatedById: string | null;  // UUID of the account who last updated the match, can be null
    sessionId: number;  // ID of the associated session
    seasonId: number;  // ID of the associated season
};
