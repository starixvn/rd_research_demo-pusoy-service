import { Settlement } from "@rd/pusoy-rules";
import { Schema } from "mongoose";

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

export default normalSchema;
