import React from "react";
import {GambleResponse} from "../../../common/type/GambleResponse";
import { ScrollingOptionBox } from "../../framework/scrolling-option-display/ScrollingOptionBox";

import styles from './GambleResultPage.scss';
import {Address} from "../../framework/address/Address";

type GambleResultProps = {
    result: GambleResponse
};

/**
 * Renders the result of a gamble, just like Deliveroo!
 */
const GambleResultPage: React.FC<GambleResultProps> = (props) => {

    const {
        result: {
            selected: {
                restaurant,
                items,
                url
            },
            all: {
                restaurants,
            }
        }
    } = props;

    const {
        image,
    } = restaurant.metatags;

    const {
        name,
        location,
    } = restaurant.restaurant;

    console.log(props.result);

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.restaurantInformation}>
                        {image && (
                            <img
                                src={image}
                                alt={name}
                                className={styles.image}
                            />
                        )}
                        <div className={styles.restaurantInformationLines}>
                            <h1 className={styles.name}>
                                <ScrollingOptionBox
                                    choices={restaurants.map(r => r.name)}
                                    selected={
                                        <a
                                            href={`https://deliveroo.co.uk${url}`}
                                            target="_blank"
                                        >{name}</a>
                                    }
                                />
                            </h1>
                            {location?.address && (
                                <div className={styles.restaurantDetails}>
                                    <Address value={location.address} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <div className={styles.selectedItems}>
                <div className={styles.container}>
                    {
                        items.map((item) => (
                            <li key={item.id}>
                                {item.name} - {item.price.formatted}
                            </li>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export { GambleResultPage };