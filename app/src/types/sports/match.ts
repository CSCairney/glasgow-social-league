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

export interface MatchRequestDTO {
    id?: number; // Optional for match creation
    sessionId: number;
    playerOneId: string; // UUID represented as a string
    playerTwoId: string; // UUID represented as a string
    scorePlayerOne?: number; // Optional for initial creation
    scorePlayerTwo?: number; // Optional for initial creation
    winnerId?: string; // UUID represented as a string, optional
    details?: string; // Optional
    createdById: string; // UUID represented as a string
    lastUpdatedById?: string; // UUID represented as a string, optional
    seasonId: number;
}

export interface MatchResponseDTO {
    id: number; // The unique identifier of the match
    sessionId: number; // The session this match belongs to
    playerOneId: string; // UUID of the first player
    playerTwoId: string; // UUID of the second player
    scorePlayerOne: number; // The score of the first player
    scorePlayerTwo: number; // The score of the second player
    winnerId?: string; // UUID of the winner, optional since the match might not have a winner yet
    details?: string; // Additional details about the match
    createdById: string; // UUID of the user who created the match
    lastUpdatedById?: string; // UUID of the user who last updated the match, optional
    seasonId: number; // The season this match is part of
}


