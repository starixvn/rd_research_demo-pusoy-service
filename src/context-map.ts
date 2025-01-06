import {
    loadAppConfig,
    loadExpress,
    loadHandlers,
    loadMongo,
    loadPusoyRules,
    runExpress,
} from "./instances";

const defaultRun = () => {};

const contextMap: Record<string, { load: Function; run: Function }> = {
    express: {
        load: loadExpress,
        run: runExpress,
    },
    pusoyRules: {
        load: loadPusoyRules,
        run: defaultRun,
    },
    appConfig: {
        load: loadAppConfig,
        run: defaultRun,
    },
    handlers: {
        load: loadHandlers,
        run: defaultRun,
    },
    mongo: {
        load: loadMongo,
        run: defaultRun,
    },
};

const loadOrder = ["appConfig", "mongo", "pusoyRules", "express", "handlers"];

const runOrder = ["express"];

export { contextMap, loadOrder, runOrder };
