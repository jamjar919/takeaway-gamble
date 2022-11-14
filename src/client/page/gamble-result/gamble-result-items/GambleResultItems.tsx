import React from "react";
import { DeliverooCategory } from "../../../../server/type/deliveroo/DeliverooCategory";
import { CategoryHeader } from "./category-header/CategoryHeader";
import { CategoryItems } from "./category-items/CategoryItems";
import { SelectedItemWebModel } from "../../../../common/type/SelectedRestaurantAndItemsWebModel";

import styles from "./GambleResultItems.scss";

type ItemsProps = {
    items: SelectedItemWebModel[];
    categories: DeliverooCategory[];
};

const GambleResultItems: React.FC<ItemsProps> = (props) => {
    const { items, categories } = props;

    if (items.length < 1) {
        return (
            <>
                <h1>
                    OOPSIE WOOPSIE!! We made a fucky wucky!! A wittle fucko
                    boingo! The code monkeys at our headquarters are working
                    VEWY HAWD to fix this!
                </h1>
                <p>
                    No items got returned for some reason. If you're seeing
                    this, just hit the regamble button. Send me the URL if
                    you're feeling generous.
                </p>
            </>
        );
    }

    const result = categories
        .map((category) => {
            return {
                category,
                items: items.filter(
                    (selectedItem) =>
                        selectedItem.item.categoryId === category.id
                ),
            };
        })
        .filter(({ items }) => items.length > 0)
        .map(({ items, category }) => {
            return (
                <div className={styles.category} key={category.id}>
                    <CategoryHeader>{category.name}</CategoryHeader>
                    <CategoryItems items={items} />
                </div>
            );
        });

    return <>{result}</>;
};

export { GambleResultItems };
