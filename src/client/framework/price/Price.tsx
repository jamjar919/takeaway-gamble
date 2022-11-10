import React from "react";

import styles from "./Price.scss";
import { DeliverooPrice } from "../../../server/type/deliveroo/DeliverooPrice";

type PriceProps = {
  value: {
    price: DeliverooPrice;
    priceDiscounted: null | DeliverooPrice;
  };
};

const Price: React.FC<PriceProps> = (props) => {
  const {
    value: { price, priceDiscounted },
  } = props;

  if (priceDiscounted) {
    return (
      <>
        <s className={styles.originalPrice}>{price.formatted}</s>
        <span className={styles.discountedPrice}>
          {priceDiscounted.formatted}
        </span>
      </>
    );
  }

  return <>{price.formatted}</>;
};

export { Price };
