import { filterToFoodItems } from "../filterToFoodItems";

describe("filterToFoodItems", () => {
    it("filters non food items", () => {
        expect(
            filterToFoodItems([
                {
                    name: "Coca-Cola 330ml",
                    description: ""
                } as any,
                {
                    name: "Cool thing",
                    description: "Fresh orange juice"
                } as any
            ])
        ).toStrictEqual([]);
    });
});