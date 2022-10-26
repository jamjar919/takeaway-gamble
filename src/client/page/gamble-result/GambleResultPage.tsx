import React, {useEffect, useState} from "react";
import Lottie from 'react-lottie-player'
import {Navigate, useLocation} from "react-router-dom";

import {GambleResultHeader} from "./gamble-result-header/GambleResultHeader";
import {GambleResultItems} from "./gamble-result-items/GambleResultItems";
import {useGambleContext} from "../../context/GambleContext";
import {Logo} from "../../framework/logo/Logo";

import confetti from './animation/confetti.json';

import styles from './GambleResultPage.scss';
import {Basket} from "./gamble-result-items/basket/Basket";

/**
 * Renders the result of a gamble
 */
const GambleResultPage: React.FC = () => {

    const {
        gambleResult,
        gambleInProgress,
        urlGamble
    } = useGambleContext();

    console.log(gambleResult);

    const [hasShownConfetti, setHasShownConfetti] = useState(false);

    const { pathname } = useLocation()

    // Gamble for this page if a result isn't present
    useEffect(() => {
        if (!gambleInProgress && gambleResult === null) {
            urlGamble(pathname);
        }
    }, [gambleInProgress, gambleResult, pathname, urlGamble])

    if (gambleResult?.type === "error") {
        return <Navigate to="/" />;
    }

    if (gambleResult === null) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.loadingAnimation}>
                    <Logo size={"lg"} />
                </div>
            </div>
        );
    }

    const {
        selected: {
            restaurant,
            items,
            url
        }
    } = gambleResult;

    return (
        <div className={styles.pageContainer}>
            <GambleResultHeader
                restaurant={restaurant.restaurant}
                url={url}
            />
            <div className={styles.selectedItems}>
                <div className={styles.container}>
                    <div className={styles.result}>
                        <div className={styles.items}>
                            <GambleResultItems
                                items={items}
                                categories={restaurant.categories}
                            />
                        </div>
                        <div className={styles.basketContainer}>
                            <Basket selectedItems={items} ctaUrl={url} imageUrl={restaurant.metatags.image}/>
                        </div>
                    </div>
                </div>
            </div>
            {
                !hasShownConfetti && (
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
