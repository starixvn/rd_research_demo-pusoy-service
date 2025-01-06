import { Context } from "./context";
import { contextMap, loadOrder, runOrder } from "./context-map";

const ContextInstance = new Context();

loadOrder.forEach(async (instance: string) => {
    await contextMap[instance].load(ContextInstance);
});

runOrder.forEach((instance: string) => {
    contextMap[instance].run(ContextInstance);
});
