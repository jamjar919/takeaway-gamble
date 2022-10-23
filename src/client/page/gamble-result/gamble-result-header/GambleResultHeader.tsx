import React from "react";
import {Logo} from "../../../framework/logo/Logo";
import {Address} from "../../../framework/address/Address";
import {DeliverooRestaurantFull} from "../../../../server/type/deliveroo/DeliverooRestaurant";

import styles from './GambleResultHeader.scss'
import pageStyles from '../GambleResultPage.scss'

type GambleResultHeaderProps = {
    restaurant: DeliverooRestaurantFull,
    url: string
}

const GambleResultHeader: React.FC<GambleResultHeaderProps> = (props) => {
    const {
        restaurant,
        url
    } = props;

    return (
        <menu className={styles.menu}>
            <div className={pageStyles.container}>
                <div className={styles.menuItemContainer}>
                    <Logo size={"sm"} />
                    <div className={styles.menuStack}>
                        <h1 className={styles.title}>
                            <a
                                href={`https://deliveroo.co.uk${url}`}
                                target="_blank"
                            >
                                {restaurant.name}
                            </a>
                        </h1>
                        <Address value={restaurant.location.address} />
                    </div>
                </div>
            </div>
        </menu>
    )
}

export { GambleResultHeader }