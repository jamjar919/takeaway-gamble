import React, {useState} from "react";
import {GambleResponse} from "../../../common/type/GambleResponse";
import { ScrollingOptionBox } from "../../framework/scrolling-option-display/ScrollingOptionBox";
import {Address} from "../../framework/address/Address";
import {GambleResultItems} from "./gamble-result-items/GambleResultItems";

import styles from './GambleResultPage.scss';

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
        descriptionSocial
    } = restaurant.metatags;

    const {
        name,
        location,
    } = restaurant.restaurant;

    console.log(props.result);

    const [revealed, setRevealed] = useState(false);

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
                                    onComplete={() => setRevealed(true)}
                                />
                            </h1>
                            {location?.address && (
                                <div className={styles.restaurantDetails}>
                                    <Address value={location.address} />
                                </div>
                            )}
                            {descriptionSocial && (
                                <div className={styles.restaurantDetails}>
                                    {descriptionSocial}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <div className={styles.selectedItems}>
                <div className={styles.container}>
                    {revealed && (
                        <GambleResultItems
                            items={items}
                            categories={restaurant.categories}
                            ctaUrl={url}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export { GambleResultPage };