import { normaliseUrlPath } from "../deliverooMenuUrlCache";

describe("DeliverooMenuUrlCache", () => {
    it.each([
        "/menu/moonlight-balti",
        "/menu/moonlight-balti?",
        "/menu/moonlight-balti?unsafe=123",
        "/menu/moonlight-balti?unsafe=123&anotherthing=456",
    ])("normalises url %p", (url) => {
        expect(normaliseUrlPath(url)).toStrictEqual("/menu/moonlight-balti");
    });

    it.each([
        "/menu/moonlight-balti?category_id=123",
        "/menu/moonlight-balti?category_id=123&unsafe=123",
        "/menu/moonlight-balti?unsafe=123&category_id=123",
    ])("normalises url with category param %p", (url) => {
        expect(normaliseUrlPath(url)).toStrictEqual(
            "/menu/moonlight-balti?category_id=123"
        );
    });
});
