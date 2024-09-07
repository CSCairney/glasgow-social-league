export const headerImageRouteHandler = (selectedSport: string) => {
    switch (selectedSport) {
        case 'Badminton':
            return '/sports/badminton/badminton-header.png';
        case 'Football':
            return '/sports/football/football-header.jpg';
        case 'Chess':
            return '/sports/chess/chess-header.jpg';
        case 'MMA':
            return '/sports/landing/MainHeader.jpg';
        case 'Squash':
            return '/sports/squash/squash-header.webp';
        case 'Table Tennis':
            return '/sports/table-tennis/table-tennis-header.webp';
        case 'Tennis':
            return '/sports/tennis/tennis-header.webp';
        case 'Rocket League':
            return '/sports/rocket-league/rocket-league-header.webp';
        case 'Hearthstone':
            return '/sports/hearthstone/hearthstone-header.webp';
        case 'Call of Duty':
            return '/sports/call-of-duty/call-of-duty-header.webp';
    }
}