import { Cache } from "../cache";

type Thing = { thing: number };

describe("Cache", () => {
    beforeAll(() => {
        console.log = () => {};
    });

    it("returns a cached value", async () => {
        const cache = new Cache<Thing>("CacheName");
        const getValueMock = jest.fn((thing: number) =>
            Promise.resolve({ thing })
        );

        // Cache value
        await cache.getAsync("key", () => getValueMock(1));
        await cache.getAsync("key", () => getValueMock(2));
        const result = await cache.getAsync("key", () => getValueMock(3));

        expect(getValueMock).toHaveBeenCalledTimes(1);
        expect(result).toStrictEqual({ thing: 1 });
    });
});
