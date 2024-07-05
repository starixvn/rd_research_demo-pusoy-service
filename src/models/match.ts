import { Schema, model } from "mongoose";

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

const matchSchema = new Schema<IMatch>(
    {
        hash_slot_1: {
            type: Number,
            required: true,
        },
        hash_slot_2: {
            type: Number,
            required: true,
        },
        hash_slot_3: {
            type: Number,
            required: true,
        },
        hash_slot_4: {
            type: Number,
            required: true,
        },
        slot_1: {
            type: [Number],
            required: true,
        },
        slot_2: {
            type: [Number],
            required: true,
        },
        slot_3: {
            type: [Number],
            required: true,
        },
        slot_4: {
            type: [Number],
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    { collection: "match" },
);

export const MatchModel = model<IMatch>("Match", matchSchema);
