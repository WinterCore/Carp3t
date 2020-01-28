import styled from "styled-components";

interface ICardLabelProps {
    done   : boolean;
    color ?: string;
}

export const CardLabel = styled.span<ICardLabelProps>`
    cursor          : pointer;
    width           : 20px;
    margin          : 2px;
    height          : 20px;
    border-radius   : 50%;
    display         : inline-block;
    text-align      : center;
    line-height     : 20px;
    background      : ${props => props.done ? props.color : ""};
    color           : ${props => props.done ? "#000" : "#FFF"};
    text-decoration : ${props => props.done ? "line-through" : "initial"};
    font-weight     : bold;
`;