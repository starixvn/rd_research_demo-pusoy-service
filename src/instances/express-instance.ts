import morgan from "morgan";
import { Context } from "../context";
import express, { Request, Response } from "express";
import cors from "cors";
import promMid from "express-prometheus-middleware";

import { AppConfig } from "../interfaces";

const load = (context: Context): Context => {
    const app = express();
    app.use(express.json());

    app.use(
        morgan("tiny", {
            skip: (req: Request, res: Response) => req.path === "/health",
        }),
    );
    app.use(cors());
    app.use(
        promMid({
            metricsPath: "/metrics",
            collectDefaultMetrics: true,
        }),
    );
    app.get("/health", (req, res) => {
        res.send("Service is running");
    });
    app.use(
        (
            err: Error,
            req: Request,
            res: Response,
            next: express.NextFunction,
        ) => {
            console.error(err);
            res.status(500).send(JSON.stringify(err));
        },
    );

    context.setInstance("express", app);

    return context;
};

const run = (context: Context) => {
    const app = context.getInstance<express.Application>("express");
    const config = context.getInstance<AppConfig>("appConfig");

    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
};

export { load, run };
