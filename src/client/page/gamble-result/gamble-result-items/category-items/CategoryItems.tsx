import React from "react";
import {DeliverooItem} from "../../../../../server/type/deliveroo/DeliverooItem";
import {Item} from "./item/Item";

import styles from './CategoryItems.scss';

type CategoryItemsProps = {
    items: DeliverooItem[];
}

const CategoryItems: React.FC<CategoryItemsProps> = (props) => {
    const { items } = props;

    const result = items.map((item) => <Item item={item} />)

    return (
        <div className={styles.categoryItems}>
            {result}
        </div>
    )
};

export { CategoryItems };