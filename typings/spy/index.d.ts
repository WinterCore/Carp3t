declare module GameData {
    export interface DoubledCards {
        0 : any[];
        1 : any[];
        2 : any[];
        3 : any[];
    }

    export interface Hs {
        doubled_cards : DoubledCards;
        num_eaten     : number[];
        last_round    : any[];
        more_ready    : boolean[];
        player_turn   : number;
        round_index   : number;
        scores        : number[];
        stacks        : {
            [key: string] : Stack;
        };
    }

    export interface Stack {
        kind         : string;
        closed       : boolean;
        contains     : number[];
        owner        : number[];
        contains_new : {
            val : number;
            id  : number;
        }[];
    }

    export interface PlayersInfo {
        game_event_user_id? : any;
        league_badge?       : any;
        active_custom_items : string;
        points?             : any;
        fb_uid              : string;
        login               : string;
        level               : number;
        mawsem_user_id?     : any;
        id                  : number;
        avatar              : string;
        total_exp_points    : number;
        user_type           : number;
        featurebits         : number;
    }

    export interface RootObject {
        hs           : Hs;
        name         : string;
        id           : number;
        players_info : PlayersInfo[];
    }

}


type PlayedCard = {
    card   : number;
    player : number;
}