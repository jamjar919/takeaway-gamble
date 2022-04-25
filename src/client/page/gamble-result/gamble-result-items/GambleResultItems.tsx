import React from "react";
import {DeliverooCategory} from "../../../../server/type/deliveroo/DeliverooCategory";
import {CategoryHeader} from "./category-header/CategoryHeader";
import {CategoryItems} from "./category-items/CategoryItems";
import {Basket} from "./basket/Basket";
import {SelectedItem} from "../../../../common/type/SelectedRestaurantAndItems";

import styles from './GambleResultItems.scss';

type ItemsProps = {
    items: SelectedItem[];
    categories: DeliverooCategory[];
    ctaUrl: string;
};

const GambleResultItems: React.FC<ItemsProps> = (props) => {
    const { items, categories, ctaUrl } = props;

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
        <div className={styles.result}>
            <div className={styles.items}>
                {result}
            </div>
            <div className={styles.basketContainer}>
                <Basket selectedItems={items} ctaUrl={ctaUrl} />
            </div>
        </div>
    );
};

export { GambleResultItems }