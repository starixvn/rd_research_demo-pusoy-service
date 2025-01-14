import mongoose, { model } from "mongoose";
import { IRealMatch } from "../interfaces";

const realMatches = new mongoose.Schema<IRealMatch>({
    hashSlots: {
        type: [Number],
        required: true,
    },
    syncId: {
        type: String,
        required: true,
    },
    inputs: {
        type: [[Number]],
        required: true,
    },
});

export const RealMatchesModel = model<IRealMatch>("real_matches", realMatches);
