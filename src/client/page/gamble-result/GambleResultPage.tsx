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
                items
            },
            all: {
                restaurants,
            }
        }
    } = props;

    console.log(props.result);

    return (
        <div className={styles.pageContainer}>
            <header className={styles.restaurantInformation}>
                <div className={styles.container}>
                    <div className={styles.image}>
                        {/* <img src={restaurant.image}> */}
                    </div>
                    <div className={styles.restaurantInformationLines}>
                        <h1 className={styles.name}>
                            <ScrollingOptionBox
                                choices={restaurants.map(r => r.name)}
                                selected={
                                    <a
                                        href={`https://deliveroo.co.uk${restaurant.url}`}
                                        target="_blank"
                                    >{restaurant.name}</a>
                                }
                            />
                        </h1>
                        {restaurant.location.address && (
                            <div className={styles.restaurantDetails}>
                                <Address value={restaurant.location.address} />
                            </div>
                        )}
                    </div>
                    </div>
                </header>

                <div className={styles.selectedItems}>
                    {
                        items.map((item) => (
                            <li key={item.id}>
                                {item.name} - {item.price.formatted}
                            </li>
                        ))
                    }
                </div>
        </div>
    )
}

export { GambleResultPage };