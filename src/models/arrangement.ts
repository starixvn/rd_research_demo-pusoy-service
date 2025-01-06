import { Schema, model } from "mongoose";
import { IArrangement } from "../interfaces";
const arrangementSchema = new Schema<IArrangement>({
    hash: {
        type: BigInt,
        required: true,
    },
    cards: {
        segment_1: {
            type: [Number],
            required: true,
        },
        segment_2: {
            type: [Number],
            required: true,
        },
        segment_3: {
            type: [Number],
            required: true,
        },
    },
    playerId: {
        type: String,
        required: true,
    },
    isProcessing: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export const ArrangementModel = model<IArrangement>(
    "arrangement",
    arrangementSchema,
);
