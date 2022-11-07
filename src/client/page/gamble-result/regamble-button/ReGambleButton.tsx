import React from "react";
import {useGambleContext} from "../../../context/GambleContext";
import {LocalStorageKey} from "../../../framework/localstorage/LocalStorageKey";

import styles from './ReGambleButton.scss';

const ReGambleButton: React.FC = () => {
    const { postcodeGamble } = useGambleContext();

    const priceLimit = Number(localStorage.getItem(LocalStorageKey.PRICE_LIMIT)) * 100;
    const postcode = localStorage.getItem(LocalStorageKey.POSTCODE) ;

    if (!priceLimit || !postcode) {
        return null;
    }

    const handleClick = () =>
        postcodeGamble(
            postcode,
            priceLimit,
            true
        );

    return (
        <button
            className={styles.button}
            onClick={handleClick}
        >
            🔄
        </button>
    )
}

 export { ReGambleButton };