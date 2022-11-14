import React from "react";

import { Price } from "../../../../../framework/price/Price";
import { ItemWebModel } from "../../../../../../common/type/SelectedRestaurantAndItemsWebModel";

import styles from "./Item.scss";

type ItemProps = {
    item: ItemWebModel;
};

const FoodItem: React.FC<ItemProps> = (props) => {
    const { item } = props;

    return (
        <div className={styles.item}>
            <div className={styles.itemDetails}>
                <h2 className={styles.itemName}>{item.name}</h2>
                <div>{item.description}</div>
                <div className={styles.price}>
                    <Price value={item} />
                    {item.popular && (
                        <span className={styles.popular}> · Popular</span>
                    )}
                </div>
            </div>
            {item.image && (
                <div
                    className={styles.image}
                    aria-label={item.image.altText}
                    style={{
                        backgroundImage: `url(${item.image.url})`,
                    }}
                />
            )}
        </div>
    );
};

export { FoodItem };
