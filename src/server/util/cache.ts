class Cache<T> {
  private cache: Record<string, T> = {};

  get(key: string, fallback: () => T): T {
    if (typeof this.cache[key] === "undefined") {
      this.cache[key] = fallback();
    }

    return this.cache[key];
  }

  getAsync(key: string, fallback: () => Promise<T>): Promise<T> {
    return new Promise<void>((resolve) => {
      if (typeof this.cache[key] === "undefined") {
        fallback()
          .then((result) => {
            this.cache[key] = result;
          })
          .finally(() => resolve());
        return;
      }

      resolve();
    }).then(() => this.cache[key]);
  }
}

export { Cache };
