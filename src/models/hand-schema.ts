import { Hand } from "@rd/pusoy-rules";
import { Schema } from "mongoose";

const handSchema = new Schema<Hand<number[]>>(
    {
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
    },
    { _id: false },
);

export default handSchema;
