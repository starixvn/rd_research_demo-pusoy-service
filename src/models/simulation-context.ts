import mongoose, { model } from "mongoose";
import { IContext } from "../interfaces";

const simulationContext = new mongoose.Schema<IContext>({
    playerIds: {
        type: [String],
        required: true,
    },
    matchId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    hashSlots: {
        type: [Number],
        required: true,
    },
});

export const SimulationContextModel = model<IContext>(
    "contexts",
    simulationContext,
);
