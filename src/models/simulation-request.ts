import { model, Schema } from "mongoose";
import { RunSimulatorRequest } from "../types";

const simulationRequestSchema = new Schema<
    RunSimulatorRequest & { sum: number; processed: number }
>({
    contextName: { type: String, required: true },
    botId: { type: String, required: true },
    sum: { type: Number, required: true },
    processed: { type: Number, required: true },
});

export const SimulationRequestModel = model<
    RunSimulatorRequest & { sum: number; processed: number }
>("simulation_request", simulationRequestSchema);
