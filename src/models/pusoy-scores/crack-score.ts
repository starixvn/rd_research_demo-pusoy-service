import { Settlement } from "@rd/pusoy-rules";
import { Schema } from "mongoose";

const crackSchema = new Schema<Settlement["crack"]>(
    {
        isCrack: {
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

export default crackSchema;
