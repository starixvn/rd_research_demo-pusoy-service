import { Hand, Settlement } from "@rd/pusoy-rules";
import { Schema, model } from "mongoose";

export interface IFailedCase {
    matchId: string;
    arrangements: Hand<number[]>[];
    settleResult: Settlement[];
}

const handSchema = new Schema<Hand<number[]>>({
    front: {
        type: [Number],
        required: true,
    },
    middle: {
        type: [Number],
        required: true,
    },
    back: {
        type: [Number],
        required: true,
    },
});

const crackSchema = new Schema<Settlement["crack"]>({
    isCrack: {
        type: Boolean,
        required: true,
    },
    units: {
        type: Number,
        required: true,
    },
});

const failedCaseSchema = new Schema<IFailedCase>({
    matchId: {
        type: String,
        required: true,
    },
    arrangements: {
        type: [handSchema],
        required: true,
    },
});

export const FailedCaseModel = model<IFailedCase>(
    "failed-case",
    failedCaseSchema,
);
