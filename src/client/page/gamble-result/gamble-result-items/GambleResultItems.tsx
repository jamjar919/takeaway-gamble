import React from "react";
import {DeliverooCategory} from "../../../../server/type/deliveroo/DeliverooCategory";
import {CategoryHeader} from "./category-header/CategoryHeader";
import {CategoryItems} from "./category-items/CategoryItems";
import {SelectedItem} from "../../../../common/type/SelectedRestaurantAndItems";

import styles from './GambleResultItems.scss';

type ItemsProps = {
    items: SelectedItem[];
    categories: DeliverooCategory[];
};

const GambleResultItems: React.FC<ItemsProps> = (props) => {
    const { items, categories } = props;

    const result = categories
        .map((category) => {
            return {
                category,
                items: items.filter((selectedItem) => selectedItem.item.categoryId === category.id)
            }
        })
        .filter(({items}) => items.length > 0)
        .map(({ items, category }) => {
            return (
                <div className={styles.category} key={category.id}>
                    <CategoryHeader>{category.name}</CategoryHeader>
                    <CategoryItems items={items} />
                </div>
            )
        });

    return (
        <>{result}</>
    );
};

export { GambleResultItems }