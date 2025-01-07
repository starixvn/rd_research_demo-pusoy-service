import { Context } from "./context";
import { contextMap, loadOrder, runOrder } from "./assign-context";

const ContextInstance = new Context();

async function initialize() {
    const finalContext = await loadOrder.reduce(
        async (contextPromise: Promise<Context>, instanceName: string) => {
            const context = await contextPromise;
            const instance = contextMap[instanceName];
            if (instance.load) {
                const result = instance.load(context);
                return result instanceof Promise ? await result : result;
            }
            return context;
        },
        Promise.resolve(ContextInstance),
    );

    runOrder.forEach((instance: string) => {
        if (contextMap[instance].run) {
            contextMap[instance].run(finalContext);
        }
    });
}

initialize().catch(console.error);
