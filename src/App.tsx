import React  from "react";
import styled from "styled-components";

import CardsTracker from "./Components/CardsTracker/Index";
// import Players      from "./Components/Players/Index";

import Spy from "./spy";

const Container = styled.div`
    z-index        : 999999;
    direction      : ltr;
    position       : fixed;
    bottom         : 0;
    left           : 0;
    width          : 450px;
    background     : rgba(0, 0, 0, .7);
    padding        : 18px 18px 10px;
    box-sizing     : border-box;
    display        : flex;
    flex-direction : column;
`;

const Heading = styled.h1`
    font-size : 30px;
    margin : 0;
`;

const Body = styled.div`
    flex : 1;
`;

const Link = styled.a`
    font-size : 12px;
`;

const Footer = styled.div`
    display         : flex;
    justify-content : flex-end;
`;

const App = () => {
    const [inGame, setInGame] = React.useState(false);

    React.useLayoutEffect(() => {
        Spy.addSpy(Spy.GAME_INIT, () => {
            setInGame(true);
        });
    }, []);

    return (
        <Container>
            <Heading>NO CHEATING 2000</Heading>
            <Body>
                {
                    inGame
                    ? (
                        <>
                            {/* <Players /> */}
                            <CardsTracker />
                        </>
                    )
                    : <span>Please join a game...</span>
                }
            </Body>
            <Footer>
                <Link target="_blank" href="https://github.com/WinterCore/jawaker-no-cheating">report bugs</Link>
            </Footer>
        </Container>
    );
};

export default App;