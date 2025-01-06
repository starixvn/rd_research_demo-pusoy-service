class Context {
    shareInstances: Map<string, any> = new Map();

    getInstance<T>(name: string) {
        return this.shareInstances.get(name) as T;
    }

    setInstance<T>(name: string, instance: T) {
        this.shareInstances.set(name, instance);
    }
}

export { Context };
