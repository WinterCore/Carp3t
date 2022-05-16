import React  from "react";
import styled from "styled-components";

import CardsTracker from "./Components/CardsTracker/Index";
import {isInGame} from "./helpers";
// import Players      from "./Components/Players/Index";

import Spy, {GameEvent} from "./spy";

const Container = styled.div`
    z-index        : 999999;
    direction      : ltr;
    position       : fixed;
    bottom         : 0;
    left           : 0;
    width          : 300px;
    border-radius  : 0 12px 0 0;
    padding        : 12px 18px 10px;
    box-sizing     : border-box;
    display        : flex;
    flex-direction : column;
    overflow: hidden;
    background-color: #141E30;
    transition: transform 200ms ease-in-out;
    background: linear-gradient(to right,#989898,#93b3ec,#665cbc);
    color: black;
    & a {
        color: black;
    }
    & a:hover {
        color: rgba(0, 0, 0, 0.8);
    }
`;

const Heading = styled.h1`


    position: relative;
    background: linear-gradient(to right, #24243e, #141E30, #0f0c29);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 28px;
    font-weight: bold;
    
    text-transform: Uppercase;
    margin-bottom: .5em;
    font-family: 'Rubik', sans-serif;
    color: #E4E5E6;

    &:before,
    &:after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &:before {
        z-index: -1;
        text-shadow: -0.001em -0.001em 1px rgba(255,255,255,.15)
    }

    &:after {
        z-index: -2;
        text-shadow: 10px 10px 10px rgba(0,0,0,.5), 20px 20px 20px rgba(0,0,0,.4), 30px 30px 30px rgba(0,0,0,.1);
        mix-blend-mode: multiply;
    }

    margin : 0;
`;

const Body = styled.div`
    flex : 1;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items     : center;
`;

const Link = styled.a`
    font-size : 12px;
`;

const Footer = styled.div`
    display         : flex;
    justify-content : flex-start;
`;

const App = () => {
    const [, setInGame] = React.useState(false);
    const [connecting, setConnecting] = React.useState(true);
    const [isOpen, setOpen] = React.useState(false);

    React.useLayoutEffect(() => {
        Spy.addSpy(GameEvent.GAME_INIT, () => {
            setInGame(true);
            setConnecting(false);
        });
        
        Spy.addSpy(GameEvent.CONNECTED, () => {
            setConnecting(false);
        });
    }, [setInGame, setConnecting]);

    const inGame = isInGame();

    return (
        <Container style={{ transform: `translateX(${isOpen ? 0 : "-89%"})` }}>
            <HeaderContainer>
                <Heading>Carp3t</Heading>
                <div style={{ fontWeight: "bold", fontSize: 30, cursor: "pointer" }} onClick={_ => setOpen(open => ! open)}>{isOpen ? "‹" : "›"}</div>
            </HeaderContainer>
            <Body>
                {inGame && ! connecting && <CardsTracker />}
                {! inGame && <span>Please join a game...</span>}
                {connecting && inGame && <span>Connecting...</span>}
            </Body>
            <Footer>
                <Link target="_blank" href="https://github.com/WinterCore/jawaker-no-cheating">Report Bugs</Link>
            </Footer>
        </Container>
    );
};

export default App;
