import { AppConfig } from "../../interfaces";
import { Request, Response } from "express";
import ScoreConfigModel from "../../models/score-config";

const getScoreConfig = (config: AppConfig) => {
    return async (req: Request, res: Response) => {
        const scoreConfig = await ScoreConfigModel.findOne({
            id: config.scoreConfigId,
        }).exec();

        res.send(JSON.stringify(scoreConfig));
    };
};

export default getScoreConfig;
