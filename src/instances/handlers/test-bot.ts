import { Request, Response } from "express";
import { fetchBotArrangement } from "./run-simulator/fetch-bot-arrangement";
import { Hand } from "@rd/pusoy-rules";

const getRandomNumbers = (count: number, max: number) => {
    const numbers: number[] = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * max);
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
};

const testBot = () => {
    return async (
        req: Request<
            {},
            {},
            {
                botUrl: string;
                numberOfRequests: number;
                timeDelay: number;
                chunkSize: number;
            }
        >,
        res: Response,
    ) => {
        const inputs: number[][] = [];
        for (let i = 0; i < req.body.numberOfRequests; i++) {
            inputs.push(getRandomNumbers(13, 52));
        }
        const errors: string[] = [];
        const arrangements: Hand<number[]>[] = [];

        for (let i = 0; i < req.body.numberOfRequests; i++) {
            const chunk = inputs.slice(
                i * req.body.chunkSize,
                (i + 1) * req.body.chunkSize,
            );
            await Promise.all(
                chunk.map(async (input) => {
                    const result = await fetchBotArrangement(
                        "6785deb22c6269cc45574569",
                        0,
                        input,
                        req.body.botUrl,
                    ).catch((err) => {
                        errors.push(err.message);
                    });
                    if (result) {
                        arrangements.push(result);
                    }
                }),
            );
            await new Promise((resolve) =>
                setTimeout(resolve, req.body.timeDelay),
            );
        }

        res.json({
            success: errors.length === 0,
            count: arrangements.length,
            failed: errors.length,
        });
    };
};

export default testBot;
