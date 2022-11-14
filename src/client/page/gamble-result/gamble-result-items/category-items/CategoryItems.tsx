import React from "react";
import { SelectedItemWebModel } from "../../../../../common/type/SelectedRestaurantAndItemsWebModel";
import { FoodItem } from "./item/FoodItem";

import styles from "./CategoryItems.scss";

type CategoryItemsProps = {
    items: SelectedItemWebModel[];
};

const CategoryItems: React.FC<CategoryItemsProps> = (props) => {
    const { items } = props;

    const result = items.map((selectedItem) => (
        <FoodItem key={selectedItem.item.id} item={selectedItem.item} />
    ));

    return <div className={styles.categoryItems}>{result}</div>;
};

export { CategoryItems };
