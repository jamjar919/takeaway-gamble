import React from "react";
import classNames from "classnames";

import {ScrollingOptionBox} from "../../../framework/scrolling-option-display/ScrollingOptionBox";
import {Address} from "../../../framework/address/Address";
import {DeliverooMenuPageState} from "../../../../server/type/deliveroo/DeliverooState";
import {Restaurant} from "../../../../server/type/Restaurant";
import {GAMBLE_REVEAL_TIME_MS} from "../../../framework/GambleConstants";
import {useGambleContext} from "../../../context/GambleContext";

import styles from "../GambleResultPage.scss";

type GambleResultHeaderProps = {
    restaurant: DeliverooMenuPageState["menu"]["meta"],
    restaurantUrl: string,
    availableRestaurants: Restaurant[]
}

const GambleResultHeader: React.FC<GambleResultHeaderProps> = (props) => {

    const {
        restaurant,
        availableRestaurants,
        restaurantUrl
    } = props;

    const {
        image,
        descriptionSocial
    } = restaurant.metatags;

    const {
        name,
        location,
    } = restaurant.restaurant;

    const { gambleRevealed } = useGambleContext();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.restaurantInformation}>
                    {image && (
                        <img
                            src={image}
                            alt={name}
                            className={classNames(
                                styles.image,
                                gambleRevealed && styles.imageGambleRevealed
                            )}
                        />
                    )}
                    <div className={styles.restaurantInformationLines}>
                        <h1 className={styles.name}>
                            <ScrollingOptionBox
                                choices={availableRestaurants.map(r => r.name)}
                                selected={
                                    <a
                                        href={`https://deliveroo.co.uk${restaurantUrl}`}
                                        target="_blank"
                                    >{name}</a>
                                }
                                animationDuration={GAMBLE_REVEAL_TIME_MS}
                            />
                        </h1>
                        {gambleRevealed && (
                            <>
                                {location?.address && (
                                    <div className={styles.restaurantDetails}>
                                        <Address value={location.address}/>
                                    </div>
                                )}
                                {descriptionSocial && (
                                    <div className={styles.restaurantDetails}>
                                        {descriptionSocial}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export { GambleResultHeader }