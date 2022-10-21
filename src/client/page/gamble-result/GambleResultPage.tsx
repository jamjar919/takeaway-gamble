import React, {useState} from "react";
import Lottie from 'react-lottie-player'

import {SuccessfulGambleResponse} from "../../../common/type/GambleResponse";
import {GambleResultItems} from "./gamble-result-items/GambleResultItems";
import {GambleResultHeader} from "./gamble-result-header/GambleResultHeader";
import {useGambleContext} from "../../context/GambleContext";

import utensilsLoading from './animation/utensils-loading.json';
import confetti from './animation/confetti.json';

import styles from './GambleResultPage.scss';
import {Logo} from "../../framework/logo/Logo";

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

    const [hasShownConfetti, setHasShownConfetti] = useState(false);

    return (
        <div className={styles.pageContainer}>
            <menu className={styles.menu}>
                <div className={styles.container}>
                    <Logo size={"sm"} />
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
            {
                gambleRevealed && !hasShownConfetti && (
                    <div className={styles.confettiContainer}>
                        <Lottie
                            className={styles.confetti}
                            animationData={confetti}
                            play
                            onLoopComplete={() => setHasShownConfetti(true)}
                        />
                    </div>
                )
            }
        </div>
    )
}

export { GambleResultPage };
