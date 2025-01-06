import { Settlement } from "@rd/pusoy-rules";
import { Schema } from "mongoose";

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

export default pusoySchema;
