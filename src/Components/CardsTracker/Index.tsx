import React from "react";

import Card from "./Components/Card";

import { Tracker, Suit } from "./styles";

import Spy from "../../spy";

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

const generateEmptySuit = () => Array.from({ length : 13}).map(() => -1);

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
        Spy.addSpy(Spy.CARD_PLAYED, ({ card, player }: PlayedCard) => {
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

        Spy.addSpy(Spy.GAME_INIT, () => {
            setHearts(generateEmptySuit());
            setDiamonds(generateEmptySuit());
            setSpades(generateEmptySuit());
            setClubs(generateEmptySuit());
        });

        Spy.addSpy(Spy.NEW_ROUND, () => {
            setHearts(generateEmptySuit());
            setDiamonds(generateEmptySuit());
            setSpades(generateEmptySuit());
            setClubs(generateEmptySuit());
        });
    }, []);
    return (
        <Tracker>
            <div>
                <Suit>HEARTS</Suit>
                { hearts.map((player, i) => <Card key={ i } index={ i } player={ player } />) }
            </div>
            <div>
                <Suit>DIAMONDS</Suit>
                { diamonds.map((player, i) => <Card key={ i } index={ i } player={ player } />) }
            </div>
            <div>
                <Suit>SPADES</Suit>
                { spades.map((player, i) => <Card key={ i } index={ i } player={ player } />) }
            </div>
            <div>
                <Suit>CLUBS</Suit>
                { clubs.map((player, i) => <Card key={ i } index={ i } player={ player } />) }
            </div>
        </Tracker>
    );
};

export default CardsTracker;