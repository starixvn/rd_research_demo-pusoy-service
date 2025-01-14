import { model, Schema } from "mongoose";
import { settlementSchema } from "./pusoy-scores";
import { IRealSettlement } from "../interfaces";

const refSettlementSchema = new Schema<IRealSettlement["ref"]>(
    {
        contextId: { type: String, required: true },
        botId: { type: String, required: true },
    },
    { _id: false },
);
const realSettlementSchema = new Schema<IRealSettlement>({
    matchId: { type: String, required: true },
    playerIds: { type: [String], required: true },
    arrangementIds: { type: [String], required: true },
    scores: { type: [settlementSchema], required: true },
    hashSlot: { type: [Number], required: true },
    ref: { type: refSettlementSchema, required: false },
});

export const RealSettlementModel = model<IRealSettlement>(
    "simulation_settlement",
    realSettlementSchema,
);
