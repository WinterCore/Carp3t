import React from "react";

import Card from "./Components/Card";

import { Tracker, Suit, SuitContainer, CARDS_SPRITE_X_MULTIPLIER, CARDS_SPRITE_SUIT_Y_POS, CARDS_SPRITE_SUIT_X_POS, CardsContainer } from "./styles";

import Spy, {GameEvent} from "../../spy";

type Card = number;

const SUITS = {
    HEARTS   : Symbol("hearts"),
    SPADES   : Symbol("spades"),
    DIAMONDS : Symbol("diamonds"),
    CLUBS    : Symbol("clubs"),
};

// HEARTS
// SPADES
// DIAMONDS
// CLUBS

const generateEmptySuit = () => Array.from({ length : 13 }).map(() => -1);

const getCardData = (id: number): [Symbol, number] => {
    if (id < 13) {
        return [SUITS.HEARTS, id];
    } else if (id < 13 * 2) {
        return [SUITS.SPADES, id - 13];
    } else if (id < 13 * 3) {
        return [SUITS.DIAMONDS, id - 13 * 2];
    } else {
        return [SUITS.CLUBS, id - 13 * 3];
    }
};

const CardsTracker = () => {
    const [hearts, setHearts]     = React.useState<Card[]>(generateEmptySuit);
    const [diamonds, setDiamonds] = React.useState<Card[]>(generateEmptySuit);
    const [spades, setSpades]     = React.useState<Card[]>(generateEmptySuit);
    const [clubs, setClubs]       = React.useState<Card[]>(generateEmptySuit);

    React.useLayoutEffect(() => {
        Spy.addSpy(GameEvent.CARD_PLAYED, ({ card, player }: PlayedCard) => {
            const [suit, cardIndex] = getCardData(card);

            switch (suit) {
            case SUITS.HEARTS:
                setHearts((oldHearts) => {
                    const hearts = [...oldHearts];
                    hearts[cardIndex] = player;
                    return hearts;
                });
                break;
            case SUITS.DIAMONDS:
                setDiamonds((oldDiamonds) => {
                    const diamonds = [...oldDiamonds];
                    diamonds[cardIndex] = player;
                    return diamonds;
                });
                break;
            case SUITS.SPADES:
                setSpades((oldSpades) => {
                    const spades = [...oldSpades];
                    spades[cardIndex] = player;
                    return spades;
                });
                break;
            case SUITS.CLUBS:
                setClubs((oldClubs) => {
                    const clubs = [...oldClubs];
                    clubs[cardIndex] = player;
                    return clubs;
                });
                break;
            }
        });

        Spy.addSpy(GameEvent.GAME_INIT, () => {
            setHearts(generateEmptySuit());
            setDiamonds(generateEmptySuit());
            setSpades(generateEmptySuit());
            setClubs(generateEmptySuit());
        });

        Spy.addSpy(GameEvent.NEW_ROUND, () => {
            setHearts(generateEmptySuit());
            setDiamonds(generateEmptySuit());
            setSpades(generateEmptySuit());
            setClubs(generateEmptySuit());
        });
    }, []);

    return (
        <Tracker>
            <SuitContainer>
                <Suit style={{ backgroundPosition: `-${0 * CARDS_SPRITE_X_MULTIPLIER + CARDS_SPRITE_SUIT_X_POS}px -${CARDS_SPRITE_SUIT_Y_POS}px` }} />
                <CardsContainer>
                    {spades.map((player, i) => <Card suitIndex={0} key={i} index={i} player={player} />)}
                </CardsContainer>
            </SuitContainer>
            <SuitContainer>
                <Suit style={{ backgroundPosition: `-${1 * CARDS_SPRITE_X_MULTIPLIER + CARDS_SPRITE_SUIT_X_POS}px -${CARDS_SPRITE_SUIT_Y_POS}px` }} />
                <CardsContainer>
                    {clubs.map((player, i) => <Card suitIndex={1} key={i} index={i} player={player} />)}
                </CardsContainer>
            </SuitContainer>
            <SuitContainer>
                <Suit style={{ backgroundPosition: `-${2 * CARDS_SPRITE_X_MULTIPLIER + CARDS_SPRITE_SUIT_X_POS}px -${CARDS_SPRITE_SUIT_Y_POS}px` }} />
                <CardsContainer>
                    {diamonds.map((player, i) => <Card suitIndex={2} key={i} index={i} player={player} />)}
                </CardsContainer>
            </SuitContainer>
            <SuitContainer>
                <Suit style={{ backgroundPosition: `-${3 * CARDS_SPRITE_X_MULTIPLIER + CARDS_SPRITE_SUIT_X_POS}px -${CARDS_SPRITE_SUIT_Y_POS}px` }} />
                <CardsContainer>
                    {hearts.map((player, i) => <Card suitIndex={3} key={i} index={i} player={player} />)}
                </CardsContainer>
            </SuitContainer>
        </Tracker>
    );
};

export default CardsTracker;
