import appConfig from "../../configs/app-config.js";
import { Context } from "../context";
import { AppConfig } from "../interfaces";

const load = (context: Context): Context => {
    const config: AppConfig = appConfig;

    context.setInstance("appConfig", config);

    return context;
};

export { load };
