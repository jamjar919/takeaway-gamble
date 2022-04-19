import React from "react";
import {DeliverooItem} from "../../../../../../server/type/deliveroo/DeliverooItem";

import styles from './Item.scss';

type ItemProps = {
    item: DeliverooItem;
}

const Item: React.FC<ItemProps> = (props) => {
    const { item } = props;

    return (
        <div className={styles.item}>
            <div className={styles.itemDetails}>
                <h2 className={styles.itemName}>{item.name}</h2>
                <div>{item.description}</div>
                <div className={styles.price}>
                    {item.price.formatted}
                    {item.popular && (
                        <span className={styles.popular}> · Popular</span>
                    )}
                </div>
            </div>
            {item.image &&
                <div
                    className={styles.image}
                    aria-label={item.image.altText}
                    style={{
                        backgroundImage: `url(${item.image.url})`
                    }}
                >
            </div>}
        </div>
    )
}

export { Item }