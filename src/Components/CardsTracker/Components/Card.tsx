import React from "react";
import { CardLabel } from "./styles";
import { getCardName } from "../../../helpers";

type CardProps = {
    index  : number;
    player : number;
}


const PLAYER_COLORS: { [key: string]: string } = {
    "0"  : "#FF6666",
    "1"  : "#99FF99",
    "2"  : "#9999FF",
    "3"  : "#FFFF99"
};

const Card: React.FC<CardProps> = ({ index, player }) => {
    return <CardLabel done={ player > -1 } color={ PLAYER_COLORS[player.toString()] }>{ getCardName(index) }</CardLabel>
};

export default Card;