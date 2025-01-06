import { Settlement } from "@rd/pusoy-rules";

export interface AppConfig {
    scoreConfigId: number;
    port: number;
    db: string;
}

export interface IArrangement {
    hash: bigint;
    cards: {
        segment_1: number[];
        segment_2: number[];
        segment_3: number[];
    };
    playerId: string;
    isProcessing: boolean;
}

export interface IMatch {
    hash_slot_1: bigint;
    hash_slot_2: bigint;
    hash_slot_3: bigint;
    hash_slot_4: bigint;
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
