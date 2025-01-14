import mongoose from "mongoose";

import { model } from "mongoose";
import { IBot } from "../interfaces";

const bot = new mongoose.Schema<IBot>({
    type: {
        type: Number,
        required: true,
    },
    botUrl: {
        type: String,
        required: true,
    },
});

export const BotModel = model<IBot>("players", bot);
