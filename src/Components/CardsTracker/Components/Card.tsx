import React from "react";
import {CARDS_SPRITE_X_MULTIPLIER, CARDS_SPRITE_Y_MULTIPLIER, fixCardIndex} from "../styles";
import { CardLabel } from "./styles";

type CardProps = {
    index     : number;
    player    : number;
    suitIndex : number;
}

const PLAYER_COLORS: { [key: string]: string } = {
    "0"  : "#FF6666",
    "1"  : "#99FF99",
    "2"  : "#9999FF",
    "3"  : "#FFFF99"
};

const Card: React.FC<CardProps> = ({ index, suitIndex, player }) => {
    const backgroundPosition = React.useMemo(() => {
        const actualIndex = fixCardIndex(index);
        return `-${suitIndex * CARDS_SPRITE_X_MULTIPLIER}px -${CARDS_SPRITE_Y_MULTIPLIER * actualIndex}px`;
    }, [index, suitIndex]);

    return (
        <CardLabel done={player > -1}
                   style={{ backgroundPosition }}
                   color={PLAYER_COLORS[player.toString()]} />
    );
};

export default Card;
