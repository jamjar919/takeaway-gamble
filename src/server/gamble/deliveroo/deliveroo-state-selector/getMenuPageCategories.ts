import { DeliverooState } from "../../../type/deliveroo/DeliverooState";
import { DeliverooCategory } from "../../../type/deliveroo/DeliverooCategory";

const getMenuPageCategories = (state: DeliverooState): DeliverooCategory[] => {
    const layoutGroups =
        state?.props?.initialState?.menuPage?.menu?.layoutGroups;

    if (!layoutGroups) {
        console.log("No layoutGroups");
        return [];
    }

    return layoutGroups
        .flatMap((group) => group.layouts)
        .filter((layouts) => layouts.typeName === "UILayoutGrid")
        .flatMap((group) => group.blocks)
        .map((card) => {
            const cardTarget = card.cardTarget;

            if (!cardTarget || cardTarget.typeName !== "UITargetShowSection") {
                console.log("Card target for categories page was not a category");
                console.log(cardTarget);
                return null;
            }

            const categoryId = cardTarget
                .sectionParams
                .find((param) => param.id === "category_id")
                ?.value?.[0]

            const categoryName = card.lines?.[0].spans?.[0].text;

            if (!categoryId || !categoryName) {
                return null;
            }

            const category: DeliverooCategory = {
                id: categoryId,
                name: categoryName,
            };

            return category;
        })
        .filter((card) => card !== null)
        .map((card) => card as DeliverooCategory);
};

export { getMenuPageCategories };
