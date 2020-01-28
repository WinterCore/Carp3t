import { isInGame } from "../helpers";

import { getPlayedCard, isNewRound } from  "./parser";

type SpyObject = {
    type : Symbol,
    fn   : (msg: any) => void
}

type GameEventArgs = [number, any];

const EVENTS = {
    UPDATE_ENGINE      : "updateEngine",
    RUN_ENGINE_COMMAND : "runEngineCommands",
    ENGINE             : "engine"
};

class Spy {
    static GAME_INIT   = Symbol("game init");
    static CARD_PLAYED = Symbol("card played");
    static NEW_ROUND   = Symbol("new round");

    static spies: SpyObject[] = [];

    static currentGame: GameData.RootObject;

    static HANDLERS = {
        [EVENTS.UPDATE_ENGINE](data: any): void {
            const fns = Spy.spies.filter(({ type }) => type === Spy.GAME_INIT);
            fns.forEach(_ => _.fn(data[1]));
            Spy.currentGame = data[1];
        },

        [EVENTS.RUN_ENGINE_COMMAND]([gameId, data]: GameEventArgs): void {
            if (Spy.currentGame && gameId !== Spy.currentGame.id)
                return;
            const cardData = getPlayedCard(data);
            if (cardData) {
                const fns = Spy.spies.filter(({ type }) => type === Spy.CARD_PLAYED);
                fns.forEach(_ => _.fn(cardData));
            }
            if (isNewRound(data)) {
                const fns = Spy.spies.filter(({ type }) => type === Spy.NEW_ROUND);
                fns.forEach(_ => _.fn(data));
            }
        },

        [EVENTS.ENGINE]([command, [gameId, data]]: [string, GameEventArgs]): void {
            if (Spy.currentGame && gameId !== Spy.currentGame.id)
                return;
            if (command === "update_game_state" && data.action === "move") {
                const fns = Spy.spies.filter(({ type }) => type === Spy.CARD_PLAYED);
                fns.forEach(_ => _.fn({ card : data.card, player : 0 }));
            }
        }
    };

    static addSpy(type: Symbol, fn: (msg: any) => void) {
        Spy.spies.push({ type, fn });
    }

    static sendMessage(msg: string) {
        let data: any[] = JSON.parse(msg);
        const command = data.shift();
        if (Spy.HANDLERS[command])
            Spy.HANDLERS[command](data);
    }

    static gameInit(data: GameData.RootObject) {
    }
}

let reoverrideIntervalId = 0;

const override = (): void => {
    const originalOnMessage = window.App.comm.socket.onmessage as ((this: WebSocket, ev: MessageEvent) => any);
    const originalSend = window.App.comm.socket.send;
    const originalOnClose = window.App.comm.socket.onclose as ((this: WebSocket, ev: CloseEvent) => any);
    window.App.comm.socket.onmessage = function onmessage(ev: MessageEvent) {
        Spy.sendMessage(ev.data);
        originalOnMessage.call(this, ev);
    };
    window.App.comm.socket.send = function send(data: string | ArrayBuffer | Blob | ArrayBufferView) {
        Spy.sendMessage(data.toString());
        originalSend.call(this, data);
    };
    window.App.comm.socket.onclose = function onclose(ev: CloseEvent) {
        originalOnClose.call(this, ev);
        reoverrideIntervalId = setInterval(() => {
            if (window.App.comm.socket.readyState === 1) {
                override();
                clearInterval(reoverrideIntervalId);
            }
        }, 100);
    };
};

override();

if (isInGame()) {
    // if the browser got refreshed in a game window force the socket to reconnect in order to get the game data
    window.App.comm.socket.close();
}

export default Spy;