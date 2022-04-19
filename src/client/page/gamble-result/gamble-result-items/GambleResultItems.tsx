import React from "react";
import {DeliverooItem} from "../../../../server/type/deliveroo/DeliverooItem";
import {DeliverooCategory} from "../../../../server/type/deliveroo/DeliverooCategory";
import {CategoryHeader} from "./category-header/CategoryHeader";
import {CategoryItems} from "./category-items/CategoryItems";

import styles from './GambleResultItems.scss';
import {Basket} from "./basket/Basket";

type ItemsProps = {
    items: DeliverooItem[];
    categories: DeliverooCategory[];
    ctaUrl: string;
};

const GambleResultItems: React.FC<ItemsProps> = (props) => {
    const { items, categories, ctaUrl } = props;

    const result = categories
        .map((category) => {
            return {
                category,
                items: items.filter((item) => item.categoryId === category.id)
            }
        })
        .filter(({items}) => items.length > 0)
        .map(({ items, category }) => {
            return (
                <div className={styles.category}>
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
                <Basket items={items} ctaUrl={ctaUrl} />
            </div>
        </div>
    );
};

export { GambleResultItems }