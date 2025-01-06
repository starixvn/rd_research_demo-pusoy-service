import mongoose from "mongoose";
import { Context } from "../context";
import { AppConfig } from "../interfaces";

const load = async (context: Context): Promise<Context> => {
    const config: AppConfig = context.getInstance("appConfig");

    await mongoose.connect(config.db);

    return context;
};

export { load };
