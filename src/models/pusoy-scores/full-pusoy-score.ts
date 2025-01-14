import { ScoreConfig } from "@rd/pusoy-rules";
import { Schema } from "mongoose";

const fullPusoySchema = new Schema<ScoreConfig["pusoy"]["full"]>(
    {
        isWinnerTakeAll: {
            type: Boolean,
            required: true,
        },
        units: {
            type: Number,
            required: true,
        },
    },
    { _id: false },
);

export default fullPusoySchema;
