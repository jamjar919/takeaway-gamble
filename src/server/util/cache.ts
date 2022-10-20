class Cache<T> {
    private cache: Record<string, T> = {};

    get(key: string, fallback: () => T): T {
        if (!this.cache[key]) {
            this.cache[key] = fallback();
        }

        return this.cache[key];
    }

    getAsync(key: string, fallback: () => Promise<T>): Promise<T> {
        return new Promise<void>((resolve) => {
            if (typeof this.cache[key] === "undefined") {
                console.log("getting new value");

                fallback()
                    .then((result) => {
                        console.log("stored new value")

                        this.cache[key] = result;
                    })
                    .finally(() => resolve());
                return;
            }

            resolve();
        })
        .then(() => this.cache[key])
    }
}

export { Cache }
