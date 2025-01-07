import { createPusoyRules } from "@rd/pusoy-rules";
import { Context } from "../context";
import { AppConfig } from "../interfaces";
import { defaultScoreConfig } from "../default-score-config";
import ScoreConfigModel from "../models/score-config";

const load = async (context: Context): Promise<Context> => {
    const config: AppConfig = context.getInstance("appConfig");

    let pusoy = createPusoyRules(defaultScoreConfig);

    try {
        const scoreConfig = await ScoreConfigModel.findOne({
            id: config.scoreConfigId,
        }).exec();
        pusoy = createPusoyRules(scoreConfig!);
    } catch (error) {
        console.log(error);
    }

    context.setInstance("pusoyRules", pusoy);

    return context;
};

export { load };
