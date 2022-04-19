import React from "react";
import {DeliverooItem} from "../../../../../server/type/deliveroo/DeliverooItem";

import styles from './Basket.scss'

type BasketProps = {
    items: DeliverooItem[];
    ctaUrl: string;
}

const Basket: React.FC<BasketProps> = (props) => {
    const {
        items,
        ctaUrl
    } = props;

    const total = items
        .map((item) => item.price.fractional)
        .reduce((a,b) => a + b, 0)/100;

    const currency = items?.[0]?.price?.code || 'GBP';

    const locale = Intl.NumberFormat('en-GB', {
        style: "currency",
        currency
    });

    return (
        <div className={styles.basket}>
            <div className={styles.title}>
                Your order
            </div>
            <ul className={styles.basketItems}>
                {items.map((item) => (
                    <li>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemPrice}>{item.price.formatted}</span>
                    </li>
                ))}
            </ul>
            <div className={styles.row}>
                <div className={styles.banner}>
                    <span>
                        View the code on <a href="https://github.com/jamjar919/deliveroo-gamble">Github</a>
                    </span>
                    <span>
                        Created by <a href="https://thejamespaterson.com">James Paterson</a>
                    </span>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.totalLine}>
                    <div className={styles.total}>
                        Total
                    </div>
                    <div className={styles.price}>
                        {locale.format(total)}
                    </div>
                </div>
                <a
                    className={styles.cta}
                    target="_blank"
                    href={`https://deliveroo.co.uk/${ctaUrl}`}
                >
                    Go to restaurant
                </a>
            </div>
        </div>
    )
};

export { Basket }