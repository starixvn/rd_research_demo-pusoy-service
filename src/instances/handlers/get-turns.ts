import { Request, Response } from "express";
import { GameStateModel } from "../../types";

const getTurns = () => {
    return async (req: Request<{}, {}, GameStateModel>, res: Response) => {
        const isHaveOutput = req.body.shared.is_have_output;
        const turns = isHaveOutput.map((state) => !state);

        res.json({ turns });
    };
};

export default getTurns;
