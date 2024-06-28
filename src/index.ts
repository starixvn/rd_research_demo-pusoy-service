import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { Hand, Settler } from "@rd/pusoy-rules";
import ScoreConfigModel from "./models/score-config.js";
import morgan from "morgan";
import cors from "cors";
import { appConfig } from "./app-config.js";

const app: Express = express();
const port = appConfig.port;

const init = async () => {
    await mongoose.connect(appConfig.db);
    const scoreConfig = await ScoreConfigModel.findOne({
        id: appConfig.scoreConfigId,
    }).exec();
    Settler.configure(scoreConfig!);
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
        const result = Settler.settle(req.body.arrangements, [
            true,
            true,
            true,
            true,
        ]);
        res.send(result);
    },
);

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});

app.get("/config", async (req: Request, res: Response) => {
    const scoreConfig = await ScoreConfigModel.findOne({
        id: appConfig.scoreConfigId,
    }).exec();

    res.send(JSON.stringify(scoreConfig));
});

app.listen(port, () => {
    console.log(`[server]: Server is running at port: ${port}`);
});
