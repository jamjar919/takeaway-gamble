import React from "react";
import {getPriceFromDeliverooObject} from "../../../../../common/util/getPriceFromDeliverooObject";
import {SelectedItem} from "../../../../../common/type/SelectedRestaurantAndItems";
import {BasketItem} from "./basket-item/BasketItem";

import styles from './Basket.scss'

type BasketProps = {
    selectedItems: SelectedItem[];
    ctaUrl: string;
}

const Basket: React.FC<BasketProps> = (props) => {
    const {
        selectedItems,
        ctaUrl
    } = props;

    const total = selectedItems
        .map((selectedItem) => {
            const itemPrice = getPriceFromDeliverooObject(selectedItem.item).fractional;
            const modifierPrices = selectedItem.modifiers
                .flatMap((modifier) => modifier.options)
                .map((option) => getPriceFromDeliverooObject(option))
                .reduce((a, b) => b.fractional + a, 0);

            return itemPrice + modifierPrices;
        })
        .reduce((a,b) => a + b, 0)/100;

    const currency = selectedItems?.[0]?.item.price?.code || 'GBP';

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
                {selectedItems
                    .sort((a, b) => getPriceFromDeliverooObject(b.item).fractional - getPriceFromDeliverooObject(a.item).fractional)
                    .map((selectedItem) => (<BasketItem key={selectedItem.item.id} selectedItem={selectedItem} />))
                }
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
                    href={`https://deliveroo.co.uk${ctaUrl}`}
                >
                    Go to restaurant
                </a>
            </div>
        </div>
    )
};

export { Basket }