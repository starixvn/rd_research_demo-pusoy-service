import { Settlement } from "@rd/pusoy-rules";
import { Schema } from "mongoose";
import pusoyUnitSchema from "./pusoy-unit-score";

const royaltySchema = new Schema<Settlement["royalty"]>(
    {
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
    },
    { _id: false },
);

export default royaltySchema;
