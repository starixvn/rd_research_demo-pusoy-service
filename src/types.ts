export type GameStartRequest = {
    players: string[];
    game_type: string;
    limit: number;
    offset: number;
    processed: number;
    random?: boolean;
};

export type PlayerPrivateState = {
    player_id: string;
    arrangement_id: string;
    input_hash: number;
    input?: number[];
    output?: {
        segment_1: number[];
        segment_2: number[];
        segment_3: number[];
    };
};

export type MatchModel = {
    id: string;
    hash_slot_1?: bigint;
    hash_slot_2?: bigint;
    hash_slot_3?: bigint;
    hash_slot_4?: bigint;
};

export type ShareState = {
    match: MatchModel;
    is_have_output: boolean[];
};

export type GameStateModel = {
    private: PlayerPrivateState[];
    shared: ShareState;
};
