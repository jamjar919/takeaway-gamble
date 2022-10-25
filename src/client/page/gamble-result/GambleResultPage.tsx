import React, {useState} from "react";
import Lottie from 'react-lottie-player'
import { Navigate } from "react-router-dom";

import {GambleResultHeader} from "./gamble-result-header/GambleResultHeader";
import {GambleResultItems} from "./gamble-result-items/GambleResultItems";
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
        gambleRevealed,
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
        }
    } = gambleResult;

    console.log(gambleResult);

    if (!gambleRevealed) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.loadingAnimation}>
                    <Logo size={"lg"} />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <GambleResultHeader
                restaurant={restaurant.restaurant}
                url={url}
            />
            <div className={styles.selectedItems}>
                <div className={styles.container}>
                    <GambleResultItems
                        items={items}
                        categories={restaurant.categories}
                        ctaUrl={url}
                        imageUrl={restaurant.metatags.image}
                    />
                    <div>
                        <button>
                            Regamble!
                        </button>
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
