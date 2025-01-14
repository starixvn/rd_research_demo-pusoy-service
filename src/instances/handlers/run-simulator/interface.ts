import { Hand } from "@rd/pusoy-rules";

export interface RawHand {
    segment_1: number[];
    segment_2: number[];
    segment_3: number[];
}

export interface ArrangementResponse {
    arrangementId: string;
    playerId: string;
    hand: Hand<number[]>;
    hashSlot: number;
}
