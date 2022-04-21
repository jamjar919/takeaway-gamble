import React from "react";
import {DeliverooItem} from "../../../server/type/deliveroo/DeliverooItem";

import styles from './Price.scss';

type PriceProps = {
    value: DeliverooItem
}

const Price: React.FC<PriceProps> = (props) => {
    const {
        value: {
            price,
            priceDiscounted
        }
    } = props;

    if (priceDiscounted) {
        return (
            <>
                <s className={styles.originalPrice}>{price.formatted}</s>
                <span className={styles.discountedPrice}>{priceDiscounted.formatted}</span>
            </>
        )
    }

    return <>{price.formatted}</>
}

export { Price }