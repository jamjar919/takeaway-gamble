import React, {useState} from "react";
import Lottie from 'react-lottie-player'
import { Navigate } from "react-router-dom";

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
            <menu className={styles.menu}>
                <div className={styles.container}>
                    <div className={styles.menuItemContainer}>
                        <Logo size={"sm"} />
                        <h1 className={styles.title}>
                            <a
                                href={`https://deliveroo.co.uk${url}`}
                                target="_blank"
                            >
                                {restaurant.restaurant.name}
                            </a>
                        </h1>
                    </div>
                </div>
            </menu>
            <div className={styles.selectedItems}>
                <div className={styles.container}>
                    <GambleResultItems
                        restaurant={restaurant.restaurant}
                        items={items}
                        categories={restaurant.categories}
                        ctaUrl={url}
                    />
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
