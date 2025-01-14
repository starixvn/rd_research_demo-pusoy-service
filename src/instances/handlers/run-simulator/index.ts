import { IPusoyRules } from "../../../interfaces";
import { Request, Response } from "express";
import { RunSimulatorRequest } from "../../../types";
import { SimulationContextModel } from "../../../models/simulation-context";
import { BotModel } from "../../../models/bot";
import { runMatch } from "./run-match";
import { SimulationRequestModel } from "../../../models/simulation-request";
import { RealSettlementModel } from "../../../models/real-settlement";

const runSimulator = (pusoyRules: IPusoyRules) => {
    return async (req: Request<{}, {}, RunSimulatorRequest>, res: Response) => {
        const { contextName, botId } = req.body;

        const context = await SimulationContextModel.find({
            name: contextName,
        });

        const contextIds = context.map((ctx) => ctx._id.toString());

        const settlement = await RealSettlementModel.find({
            "ref.contextId": { $in: contextIds },
            "ref.botId": botId,
        }).exec();

        const filterContext = context.filter(
            (ctx) =>
                !settlement.some((s) => s.ref.contextId === ctx._id.toString()),
        );

        let simulationRequest = await SimulationRequestModel.findOne({
            contextName,
            botId,
        }).exec();

        if (
            simulationRequest &&
            simulationRequest.processed === simulationRequest.sum &&
            simulationRequest.sum === context.length
        ) {
            res.send({
                message: "Simulation request already processed",
            });
            return;
        }

        if (!simulationRequest) {
            simulationRequest = await SimulationRequestModel.create({
                contextName,
                botId,
                sum: context.length,
                processed: 0,
            });
        }

        if (simulationRequest.sum < context.length) {
            simulationRequest.sum = context.length;
            await simulationRequest.save();
        }

        const bot = await BotModel.findById(botId);

        if (!bot) {
            throw new Error("Bot not found");
        }

        Promise.all(
            filterContext.map(async (ctx) => {
                try {
                    await runMatch(ctx, botId, bot.botUrl, pusoyRules.settle);
                    await simulationRequest.updateOne({
                        $inc: { processed: 1 },
                    });
                } catch (error) {
                    console.error(error);
                }
            }),
        );

        res.send({
            message: "Match run successfully",
        });
    };
};

export default runSimulator;
