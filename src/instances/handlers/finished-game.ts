import { Request, Response } from "express";
import { GameStateModel } from "../../types";

const finishedGame = () => {
    return async (req: Request<{}, {}, GameStateModel>, res: Response) => {
        const isFinishPlayers = req.body.shared.is_have_output;
        const finished =
            isFinishPlayers.filter((state) => state === true).length ===
            isFinishPlayers.length;

        res.json({ finished });
    };
};

export default finishedGame;
