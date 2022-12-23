type CacheRecord<T> = Readonly<{
    value: Readonly<T>;
    timestamp: number;
}>;

/**
 * Simple in memory cache with timeout. Realistically, this should be moved to a database but this will do for now
 */
class Cache<T> {
    private readonly cache: Record<string, CacheRecord<T>> = {};
    private readonly name: string;
    private readonly timeout: number;
    private cacheAccessCount: number = 0;

    constructor(name: string, timeout: number = 0) {
        this.name = name;
        this.timeout = timeout;
    }

    getAsync(key: string, fallback: () => Promise<T>): Promise<T> {
        this.cacheAccessCount += 1;

        // Clean cache values if we've accessed over 10 times
        if (this.cacheAccessCount > 5) {
            this.cacheAccessCount = 0;
            this.cleanExpiredCachedValues();
        }

        return new Promise<void>((resolve) => {
            if (this.shouldUpdateCache(key)) {
                fallback()
                    .then((result) => {
                        this.logCacheAction(
                            "Computing new cache value for key:",
                            key
                        );

                        this.cache[key] = Object.freeze({
                            value: Object.freeze(result),
                            timestamp: Date.now(),
                        });

                        this.logCacheAction(
                            "Updated cache size:",
                            Object.keys(this.cache).length
                        );
                    })
                    .finally(() => resolve());
                return;
            }

            this.logCacheAction("Hit cache for", key);

            resolve();
        }).then(() => this.cache[key].value);
    }

    has(key: string): boolean {
        return typeof this.cache[key] !== "undefined"
    }

    // For a given value, whether the cache should be updated - either key is not present or has expired
    private shouldUpdateCache(key: string): boolean {
        return (
            !this.has(key) || this.hasCachedValueExpired(key)
        );
    }

    // Whether the cached value has expired according to the given timeout
    private hasCachedValueExpired(key: string): boolean {
        if (this.timeout <= 0 || !this.has(key)) {
            return false;
        }

        const timeDifference = Date.now() - this.cache[key].timestamp;

        return timeDifference > this.timeout;
    }

    private cleanExpiredCachedValues() {
        const prevSize = Object.keys(this.cache).length;
        this.logCacheAction("Cleaning cache:");

        Object.keys(this.cache).forEach((key) => {
            if (this.hasCachedValueExpired(key)) {
                delete this.cache[key];
            }
        });

        const sizeAfter = Object.keys(this.cache).length;
        this.logCacheAction(
            `Cleaned ${sizeAfter - prevSize} expired items from cache`
        );
    }

    private logCacheAction(...args: any[]) {
        console.log(`[${this.name}]`, ...args);
    }
}

export { Cache };
