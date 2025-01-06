import { Hand, Settlement } from "@rd/pusoy-rules";
import { Schema, model } from "mongoose";
import { handSchema, settlementSchema } from "./pusoy-scores";

export interface IFailedCase {
    matchId: string;
    arrangements: Hand<number[]>[];
    settleResult: Settlement[];
}

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
