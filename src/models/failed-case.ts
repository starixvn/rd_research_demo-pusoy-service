import { Hand, Settlement } from "@rd/pusoy-rules";
import { Schema, model } from "mongoose";
import { pusoyUnitSchema } from "./score-config";

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

const pusoySchema = new Schema<Settlement["pusoy"]>({
    mini: {
        type: Object,
        required: true,
    },
    full: {
        type: Number,
        required: true,
    },
});

const normalSchema = new Schema<Settlement["normal"]>({
    front: {
        type: Number,
        required: true,
    },
    middle: {
        type: Number,
        required: true,
    },
    back: {
        type: Number,
        required: true,
    },
});

const royaltySchema = new Schema<Settlement["royalty"]>({
    front: {
        type: pusoyUnitSchema,
        required: true,
    },
    middle: {
        type: pusoyUnitSchema,
        required: true,
    },
    back: {
        type: pusoyUnitSchema,
        required: true,
    },
});

const settlementSchema = new Schema<Settlement>({
    sum: {
        type: Number,
        required: false,
    },
    crack: {
        type: crackSchema,
        required: false,
    },
    pusoy: {
        type: pusoySchema,
        required: false,
    },
    natural: {
        type: pusoyUnitSchema,
        required: false,
    },
    normal: {
        type: normalSchema,
        required: false,
    },
    royalty: {
        type: royaltySchema,
        required: false,
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
    settleResult: {
        type: [settlementSchema],
        required: false,
    },
});

export const FailedCaseModel = model<IFailedCase>(
    "failed-case",
    failedCaseSchema,
);
