import { Context } from "../context";
import express from "express";
import { Hand, Settlement } from "@rd/pusoy-rules";
import { AppConfig } from "../interfaces";
import {
    botMove,
    finishedGame,
    getScoreConfig,
    getTurns,
    reportFailedCase,
    runSimulator,
    settleGame,
    settleGameClient,
    startGame,
    testBot,
} from "./handlers";

const load = (context: Context): Context => {
    const app = context.getInstance<express.Application>("express");
    const pusoy = context.getInstance<{
        settle: (playerData: Hand<number[]>[]) => Settlement[];
    }>("pusoyRules");
    const config = context.getInstance<AppConfig>("appConfig");

    app.post("/settle-game-client", settleGameClient(pusoy));
    app.get("/config", getScoreConfig(config));
    app.post("/report", reportFailedCase());
    app.post("/start", startGame());
    app.post("/turn", getTurns());
    app.post("/finished", finishedGame());
    app.post("/move", botMove());
    app.post("/settle", settleGame(pusoy));
    app.post("/run-simulator", runSimulator(pusoy));
    app.post("/test-bot", testBot());

    return context;
};

export { load };
