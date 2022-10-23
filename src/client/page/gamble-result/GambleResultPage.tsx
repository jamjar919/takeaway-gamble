import React, {useState} from "react";
import Lottie from 'react-lottie-player'
import { Navigate } from "react-router-dom";

import {GambleResultItems} from "./gamble-result-items/GambleResultItems";
import {GambleResultHeader} from "./gamble-result-header/GambleResultHeader";
import {useGambleContext} from "../../context/GambleContext";
import {Logo} from "../../framework/logo/Logo";

import confetti from './animation/confetti.json';

import styles from './GambleResultPage.scss';

/**
 * Renders the result of a gamble
 */
const GambleResultPage: React.FC = () => {

    const {
        gambleResult,
        resetGamble,
        gambleRevealed
    } = useGambleContext();

    const [hasShownConfetti, setHasShownConfetti] = useState(false);

    if (gambleResult?.type !== "success") {
        return <Navigate to="/" />;
    }

    const {
        selected: {
            restaurant,
            items,
            url
        },
        all: {
            restaurants,
        }
    } = gambleResult;

    console.log(gambleResult);

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
                            <div className={styles.loadingAnimation}>
                                <Logo size={"lg"} />
                            </div>
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
