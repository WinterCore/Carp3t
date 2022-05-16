import styled from "styled-components";

export const CARDS_SPRITE = "https://www.jawaker.com/assets/games/new-cards-381d7fef7936d7bec988fc9d5d3201d52ead9b889248926ebb1a13d69699559a.png";

export const CARDS_SPRITE_X_MULTIPLIER = 53;
export const CARDS_SPRITE_Y_MULTIPLIER = 72;

export const CARDS_SPRITE_SUIT_Y_POS = 35;
export const CARDS_SPRITE_SUIT_X_POS = 20;

export const fixCardIndex = (index: number): number => {
    if (index < 9) return index + 1;
    return index + 4;
};



export const SuitContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px 0;
`;

export const Tracker = styled.div`
    display: flex;
    justify-content: center;
    margin : 15px 0;
    gap: 4px;
`;

export const Suit = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${CARDS_SPRITE});
`;

export const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;
