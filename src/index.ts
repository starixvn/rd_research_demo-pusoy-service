import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { Hand, createPusoyRules } from "@rd/pusoy-rules";
import ScoreConfigModel from "./models/score-config";
import morgan from "morgan";
import cors from "cors";
import appConfig from "./app-config";
import { defaultScoreConfig } from "./default-score-config";
import { MatchModel } from "./models/match";
import { FailedCaseModel, IFailedCase } from "./models/failed-case";

const app: Express = express();
const port = appConfig.port;
let pusoy = createPusoyRules(defaultScoreConfig);

const init = async () => {
    try {
        await mongoose.connect(appConfig.db);
        const scoreConfig = await ScoreConfigModel.findOne({
            id: appConfig.scoreConfigId,
        }).exec();
        pusoy = createPusoyRules(scoreConfig!);
    } catch (error) {
        console.log(error);
    }
};

init();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.post(
    "/settle-game-client",
    (
        req: Request<{}, {}, { arrangements: Hand<number[]>[] }>,
        res: Response,
    ) => {
        const result = pusoy.settle(req.body.arrangements);
        res.send(result);
    },
);

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});

app.get("/match/:id", async (req: Request, res: Response) => {
    const matchId = req.params.id;
    const match = await MatchModel.findOne({ id: matchId }).exec();
    if (!match) {
        const match = await MatchModel.findOne({
            _id: new mongoose.Types.ObjectId(matchId),
        }).exec();
        res.send(JSON.stringify(match));
        return;
    }

    res.send(JSON.stringify(match));
});

app.get("/config", async (req: Request, res: Response) => {
    const scoreConfig = await ScoreConfigModel.findOne({
        id: appConfig.scoreConfigId,
    }).exec();

    res.send(JSON.stringify(scoreConfig));
});

app.post(
    "/report",
    async (req: Request<{}, {}, IFailedCase>, res: Response) => {
        const failedCase = req.body;
        const result = await FailedCaseModel.create(failedCase);
        res.send("Save success: " + JSON.stringify(result));
    },
);

app.listen(port, () => {
    console.log(`[server]: Server is running at port: ${port}`);
});
