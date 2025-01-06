import { Request, Response } from "express";
import { Hand, Settlement } from "@rd/pusoy-rules";

const settleGameClient = (pusoy: {
    settle: (playerData: Hand<number[]>[]) => Settlement[];
}) => {
    return (
        req: Request<{}, {}, { arrangements: Hand<number[]>[] }>,
        res: Response,
    ) => {
        const result = pusoy.settle(req.body.arrangements);
        res.send(result);
    };
};

export default settleGameClient;
