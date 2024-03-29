import React from "react";
import { Price } from "../../../../../framework/price/Price";
import { SelectedItemWebModel } from "../../../../../../common/type/SelectedRestaurantAndItemsWebModel";
import { Modifiers } from "./Modifiers";

import styles from "./BasketItem.scss";

type BasketItemProps = {
    selectedItem: SelectedItemWebModel;
};

const BasketItem: React.FC<BasketItemProps> = (props) => {
    const {
        selectedItem: { item, modifiers },
    } = props;

    const hasModifiers = modifiers.length > 0;

    return (
        <li key={item.id} className={styles.basketItem}>
            <div className={styles.item}>
                <span className={styles.itemName}>{item.name}</span>
                <span>
                    <Price value={item} />
                </span>
            </div>
            {hasModifiers && <Modifiers modifiers={modifiers} />}
        </li>
    );
};

export { BasketItem };
