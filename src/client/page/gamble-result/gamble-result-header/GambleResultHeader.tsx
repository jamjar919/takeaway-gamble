import React from "react";
import {Logo} from "../../../framework/logo/Logo";
import {Address} from "../../../framework/address/Address";
import {DeliverooRestaurantFull} from "../../../../server/type/deliveroo/DeliverooRestaurant";

import styles from './GambleResultHeader.scss'
import pageStyles from '../GambleResultPage.scss'
import {Link} from "react-router-dom";
import {Endpoints} from "../../../../common/Endpoints";
import {ReGambleButton} from "../regamble-button/ReGambleButton";

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
                    <Link to={Endpoints.SEARCH} className={styles.logoWrapper}>
                        <Logo size={"sm"} />
                    </Link>
                    <div className={styles.titleContainer}>
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
                    <div className={styles.buttonContainer}>
                        <ReGambleButton />
                    </div>
                </div>
            </div>
        </menu>
    )
}

export { GambleResultHeader }