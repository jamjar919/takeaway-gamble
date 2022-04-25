import React from "react";
import {getPriceFromDeliverooObject} from "../../../../../common/util/getPriceFromDeliverooObject";
import {Price} from "../../../../framework/price/Price";
import {SelectedItem} from "../../../../../common/type/SelectedRestaurantAndItems";

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
        .map((selectedItem) => getPriceFromDeliverooObject(selectedItem.item).fractional)
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
                    .map((selectedItem) => (
                        <li key={selectedItem.item.id}>
                            <span className={styles.itemName}>{selectedItem.item.name}</span>
                            <span className={styles.itemPrice}>
                                <Price value={selectedItem.item} />
                            </span>
                        </li>
                    ))
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