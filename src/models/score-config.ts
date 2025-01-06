import { ScoreConfig } from "@rd/pusoy-rules";
import { Schema, model } from "mongoose";
import pusoyUnitSchema from "./pusoy-scores/pusoy-unit-score";

const fullPusoySchema = new Schema<ScoreConfig["pusoy"]["full"]>({
    isWinnerTakeAll: {
        type: Boolean,
        required: true,
    },
    units: {
        type: Number,
        required: true,
    },
});

const pusoySchema = new Schema<ScoreConfig["pusoy"]>({
    mini: {
        type: Number,
        required: true,
    },
    full: {
        type: fullPusoySchema,
        required: true,
    },
});

const scoreConfigSchema = new Schema<ScoreConfig>(
    {
        normal: {
            type: Number,
            required: true,
        },
        crack: {
            type: Number,
            required: true,
        },
        pusoy: pusoySchema,
        natural: [pusoyUnitSchema],
        royalty: {
            type: Object,
            required: true,
        },
    },
    { collection: "score_config" },
);

const ScoreConfigModel = model<ScoreConfig>("ScoreConfig", scoreConfigSchema);

export default ScoreConfigModel;
