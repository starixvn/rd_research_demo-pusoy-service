import { IPusoyRules } from "../../../interfaces";
import { Request, Response } from "express";
import { RunSimulatorRequest } from "../../../types";
import { SimulationContextModel } from "../../../models/simulation-context";
import { BotModel } from "../../../models/bot";
import { runMatch } from "./run-match";
import { SimulationRequestModel } from "../../../models/simulation-request";

const runSimulator = (pusoyRules: IPusoyRules) => {
    return async (
        req: Request<
            {},
            {},
            RunSimulatorRequest & { chunkSize: number; timeDelay: number }
        >,
        res: Response,
    ) => {
        const { contextName, botId, chunkSize, timeDelay } = req.body;

        const filterContext = await SimulationContextModel.aggregate([
            {
                $addFields: {
                    id: {
                        $toString: "$_id",
                    },
                },
            },
            {
                $lookup: {
                    from: "simulation_settlements",
                    localField: "id",
                    foreignField: "ref.contextId",
                    as: "settlement",
                    pipeline: [
                        {
                            $match: {
                                "ref.botId": botId,
                            },
                        },
                    ],
                },
            },
            {
                $match: {
                    settlement: {
                        $eq: [],
                    },
                    name: contextName,
                },
            },
        ]).exec();

        let simulationRequest = await SimulationRequestModel.findOne({
            contextName,
            botId,
        }).exec();

        if (filterContext.length === 0) {
            res.send({
                message: "Simulation request already processed",
            });
            return;
        }

        if (!simulationRequest) {
            simulationRequest = await SimulationRequestModel.create({
                contextName,
                botId,
                sum: filterContext.length,
                processed: 0,
            });
        }

        const bot = await BotModel.findById(botId);

        if (!bot) {
            throw new Error("Bot not found");
        }

        // Send immediate response
        res.send({
            message: "Simulation started",
            requestId: simulationRequest._id,
            remain: filterContext.length,
        });

        (async () => {
            try {
                for (let i = 0; i < filterContext.length; i += chunkSize) {
                    const chunk = filterContext.slice(i, i + chunkSize);
                    await Promise.all(
                        chunk.map(async (ctx) => {
                            try {
                                await runMatch(
                                    ctx,
                                    botId,
                                    bot.botUrl,
                                    pusoyRules.settle,
                                );
                                await simulationRequest.updateOne({
                                    $inc: { processed: 1 },
                                });
                            } catch (error) {
                                console.error(
                                    `Error processing match: ${error}`,
                                );
                            }
                        }),
                    );

                    // Add delay between chunks to prevent system overload
                    if (timeDelay) {
                        await new Promise((resolve) =>
                            setTimeout(resolve, timeDelay),
                        );
                    }
                }
            } catch (error) {
                console.error("Simulation processing error:", error);
            }
        })();
    };
};

export default runSimulator;
