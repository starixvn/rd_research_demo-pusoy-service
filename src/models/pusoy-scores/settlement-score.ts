import { Settlement } from "@rd/pusoy-rules";
import { Schema } from "mongoose";
import crackSchema from "./crack-score";
import pusoySchema from "./pusoy-score";
import normalSchema from "./normal-score";
import royaltySchema from "./royalty-score";
import pusoyUnitSchema from "./pusoy-unit-score";

const settlementSchema = new Schema<Settlement>(
    {
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
    },
    { _id: false },
);

export default settlementSchema;
