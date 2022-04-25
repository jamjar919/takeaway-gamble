import React from "react";
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import {SuccessfulGambleResponse} from "../../../common/type/GambleResponse";
import {GambleResultItems} from "./gamble-result-items/GambleResultItems";

import utensilsLoading from './animation/utensils-loading.json';

import styles from './GambleResultPage.scss';
import {GambleResultHeader} from "./gamble-result-header/GambleResultHeader";
import {useGambleContext} from "../../context/GambleContext";

type GambleResultProps = {
    result: SuccessfulGambleResponse;
    resetGamble: () => void;
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
        },
        resetGamble
    } = props;

    console.log(props.result);

    const { gambleRevealed } = useGambleContext();

    return (
        <div className={styles.pageContainer}>
            <menu className={styles.menu}>
                <div className={styles.container}>
                    <div className={styles.menuItems}>
                        <button
                            onClick={() => resetGamble()}
                            className={styles.clearButton}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </menu>
            <GambleResultHeader
                restaurant={restaurant}
                restaurantUrl={url}
                availableRestaurants={restaurants}
            />
            <div className={styles.selectedItems}>
                <div className={styles.container}>
                    {gambleRevealed
                        ? (
                            <GambleResultItems
                                items={items}
                                categories={restaurant.categories}
                                ctaUrl={url}
                            />
                        )
                        : (
                            <Lottie
                                className={styles.loadingAnimation}
                                loop
                                animationData={utensilsLoading}
                                play
                            />
                        )}
                </div>
            </div>
        </div>
    )
}

export { GambleResultPage };
