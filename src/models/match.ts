import { Schema, model } from "mongoose";
import { IMatch } from "../interfaces";

const matchSchema = new Schema<IMatch>(
    {
        hash_slot_1: {
            type: BigInt,
            required: true,
        },
        hash_slot_2: {
            type: BigInt,
            required: true,
        },
        hash_slot_3: {
            type: BigInt,
            required: true,
        },
        hash_slot_4: {
            type: BigInt,
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
