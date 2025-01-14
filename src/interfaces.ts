import { Hand, Settlement } from "@rd/pusoy-rules";

export interface AppConfig {
    scoreConfigId: number;
    port: number;
    db: string;
}

export interface IArrangement {
    hash: number;
    cards: {
        segment_1: number[];
        segment_2: number[];
        segment_3: number[];
    };
    playerId: string;
    isProcessing: boolean;
}

export interface IMatch {
    hash_slot_1: number;
    hash_slot_2: number;
    hash_slot_3: number;
    hash_slot_4: number;
    slot_1: number[];
    slot_2: number[];
    slot_3: number[];
    slot_4: number[];
    id: string;
}

export interface ISettlementSimulation {
    match_id: string;
    player_ids: string[];
    arrangement_ids: string[];
    scores: Settlement[];
}

export interface IRealMatch {
    inputs: number[][];
    hashSlots: number[];
    syncId: string;
}

export interface IContext {
    playerIds: string[];
    matchId: string;
    name: string;
    hashSlots: number[];
}

export interface IBot {
    type: number;
    botUrl: string;
}

export interface IRealArrangement {
    hashSlot: number;
    output: Hand<number[]>;
    playerId: string;
}

export interface IRealSettlement {
    matchId: string;
    playerIds: string[];
    arrangementIds: string[];
    scores: Settlement[];
    hashSlot: number[];
    simulationId?: string;
    ref: {
        contextId: string;
        botId: string;
    };
}

export interface IPusoyRules {
    settle: (input: Hand<number[]>[]) => Settlement[];
}
