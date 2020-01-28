
export const getCardName = (index: number): string => {
    if (index < 9) return `${index + 2}`;
    return ['J', 'Q', 'K', 'A'][index - 9];
};


export const isInGame = (): boolean => !!window.location.pathname.match(/^\/\w{2}\/games\/(\d+)/);