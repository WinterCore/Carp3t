import styled from "styled-components";
import {CARDS_SPRITE} from "../styles";

interface ICardLabelProps {
    done   : boolean;
    color ?: string;
}

export const CardLabel = styled.span<ICardLabelProps>`
    cursor          : pointer;
    width           : 53px;
    height          : 38px;
    display         : block;
    text-align      : center;
    line-height     : 20px;
    color           : ${props => props.done ? "#000" : "#FFF"};
    background-image: url(${CARDS_SPRITE});
    background-color: white;
    font-weight     : bold;
    position        : relative;
    border          : 1px solid black;

    ${props => props.done && (`
        &:before {
            content: "";
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            position: absolute;
            top: 0;
            left: 0;
        }
    `)}
`;
