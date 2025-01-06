import { model, Schema } from "mongoose";
import { ISettlementSimulation } from "../interfaces";
import { settlementSchema } from "./pusoy-scores";

const settlementSimulationSchema = new Schema<ISettlementSimulation>({
    match_id: {
        type: String,
        required: true,
    },
    player_ids: {
        type: [String],
        required: true,
    },
    arrangement_ids: {
        type: [String],
        required: true,
    },
    scores: {
        type: [settlementSchema],
        required: true,
    },
});

const SettlementSimulation = model<ISettlementSimulation>(
    "settlement",
    settlementSimulationSchema,
);

export default SettlementSimulation;
