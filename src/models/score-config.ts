import { ScoreConfig } from "@rd/pusoy-rules";
import { Schema, model } from "mongoose";

const pusoySchema = new Schema<ScoreConfig["pusoy"]>({
    partial: {
        type: Number,
        required: true,
    },
    full: {
        type: Number,
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
        natural: {
            type: Object,
            required: true,
        },
        royalty: {
            type: Object,
            required: true,
        },
    },
    { collection: "score_config" },
);

const ScoreConfigModel = model<ScoreConfig>("score_config", scoreConfigSchema);

export default ScoreConfigModel;
