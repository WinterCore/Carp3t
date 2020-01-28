
// window.location.pathname.match(/^\/\w{2}\/games\/(\d+)/);

const isTable = (str: string): boolean => {
    return /^(?:stack_t_\d)$|(?:stack_table)$/.test(str);
};

const isPlayer = (str: string): boolean => {
    return /^stack_pv?_\d$/.test(str);
};


const getPlayer = (str: string): number|null => {
    const match = str.match(/^stack_pv?_(\d)$/);
    return match && +match[1];
};

const getPlayedCardsFromStack = (stack: GameData.Stack): number[] => {
    return stack.contains_new.map((_) => _.id);
};

export const getPlayedCardsFromStacks = (stacks: { [key: string] : GameData.Stack }) => {
    let cards: { [key: string] : number[] } = {
        0 : [],
        1 : [],
        2 : [],
        3 : [],
    };
    Object.keys(stacks).forEach((key) => {
        if (isPlayer(key)) {
            const data = stacks[key];
            cards[data.owner.toString()] = getPlayedCardsFromStack(data);
        }
    });
    return cards;
};

export const isNewRound = (data : any): boolean => {
    let changed = 0;
    for (let item of data.cmds) {
        const command = item[0];
        if (command === "change") {
            const [, update, thing] = item[1];
            if (update === "stacks" && isPlayer(thing)) {
                changed += 1;
            } else if (update === "final_result") {
                return true;
            }
        } else if (command === "reShuffle") {
            return true;
        }
    }
    return changed >= 4;
};

export const getPlayedCard = (data: any): PlayedCard|null => {
    for (let item of data.cmds) {
        if (item[0] === "move") {
            const [from, to, card] = item.slice(1);
            if (isTable(to)) {
                const player = getPlayer(from);
                if (player !== null) {
                    return { player, card };
                }
            }
        }
    }
    return null;
};