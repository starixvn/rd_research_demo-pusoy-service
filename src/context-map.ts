import { Context } from "./context";
import {
    loadAppConfig,
    loadExpress,
    loadHandlers,
    loadMongo,
    loadPusoyRules,
    runExpress,
} from "./instances";

const contextMap: Record<
    string,
    {
        load: (context: Context) => Context | Promise<Context>;
        run?: (context: Context) => void;
    }
> = {
    express: {
        load: loadExpress,
        run: runExpress,
    },
    pusoyRules: {
        load: loadPusoyRules,
    },
    appConfig: {
        load: loadAppConfig,
    },
    handlers: {
        load: loadHandlers,
    },
    mongo: {
        load: loadMongo,
    },
};

const loadOrder = ["appConfig", "mongo", "pusoyRules", "express", "handlers"];

const runOrder = ["express"];

export { contextMap, loadOrder, runOrder };
