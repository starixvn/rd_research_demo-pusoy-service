import { Hand } from "@rd/pusoy-rules";

export const convertRawHand = (rawHand: {
    segment_1: number[];
    segment_2: number[];
    segment_3: number[];
}): Hand<number[]> => {
    return {
        front: rawHand.segment_3,
        middle: rawHand.segment_2,
        back: rawHand.segment_1,
    };
};
