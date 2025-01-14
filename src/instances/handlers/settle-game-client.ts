import { Request, Response } from "express";
import { Hand, Settlement } from "@rd/pusoy-rules";
import { IPusoyRules } from "../../interfaces";

const settleGameClient = (pusoy: IPusoyRules) => {
    return (
        req: Request<{}, {}, { arrangements: Hand<number[]>[] }>,
        res: Response,
    ) => {
        const result = pusoy.settle(req.body.arrangements);
        res.send(result);
    };
};

export default settleGameClient;
