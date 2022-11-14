import React from "react";
import { SelectedItem } from "../../../../../common/type/SelectedRestaurantAndItems";
import { FoodItem } from "./item/FoodItem";

import styles from "./CategoryItems.scss";

type CategoryItemsProps = {
    items: SelectedItem[];
};

const CategoryItems: React.FC<CategoryItemsProps> = (props) => {
    const { items } = props;

    const result = items.map((selectedItem) => (
        <FoodItem key={selectedItem.item.id} item={selectedItem.item} />
    ));

    return <div className={styles.categoryItems}>{result}</div>;
};

export { CategoryItems };
