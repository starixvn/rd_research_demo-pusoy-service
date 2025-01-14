import mongoose, { model } from "mongoose";
import handSchema from "./hand-schema";
import { IRealArrangement } from "../interfaces";

const realArrangement = new mongoose.Schema<IRealArrangement>({
    hashSlot: {
        type: Number,
        required: true,
    },
    playerId: {
        type: String,
        required: true,
    },
    output: {
        type: handSchema,
        required: true,
    },
});

export const RealArrangementModel = model<IRealArrangement>(
    "real_arrangements",
    realArrangement,
);
