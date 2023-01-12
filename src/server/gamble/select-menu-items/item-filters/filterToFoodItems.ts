import { ItemDTO } from "../../../type/RestaurantDataDTO";

const NON_FOOD_KEYWORDS = [
    "coke",
    "coca",
    "pepsi",
    "drink",
    "can",
    "water",
    "vodka",
    "gin",
    "whisky",
    "soda",
    "lemonade",
    "juice",
];

const bannedWordRegex = new RegExp(NON_FOOD_KEYWORDS.join("|"), "gi");

const filterToFoodItems = (items: ItemDTO[]): ItemDTO[] => {
    return items.filter((item) => {
        const searchString = `${item.name} ${item.description}`.toLowerCase();

        return !bannedWordRegex.test(searchString);
    });
};

export { filterToFoodItems };
