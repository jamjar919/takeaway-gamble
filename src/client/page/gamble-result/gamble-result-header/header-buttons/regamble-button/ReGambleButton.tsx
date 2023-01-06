import React from "react";
import classNames from "classnames";
import { useGambleContext } from "../../../../../context/GambleContext";
import { LocalStorageKey } from "../../../../../framework/localstorage/LocalStorageKey";
import { Icon } from "../../../../../framework/icon/Icon";

import headerButtonStyles from "../HeaderButton.scss";
import regambleButtonStyles from "./ReGambleButton.scss";

const ReGambleButton: React.FC = () => {
    const { postcodeGamble } = useGambleContext();

    const priceLimit =
        Number(localStorage.getItem(LocalStorageKey.PRICE_LIMIT)) * 100;
    const postcode = localStorage.getItem(LocalStorageKey.POSTCODE);
    const numPeople = Number(localStorage.getItem(LocalStorageKey.NUM_PEOPLE)) ?? 0;

    if (!priceLimit || !postcode) {
        return null;
    }

    const handleClick = () => postcodeGamble(postcode, priceLimit, numPeople);

    return (
        <button
            className={classNames(
                headerButtonStyles.button,
                regambleButtonStyles.regambleButton
            )}
            onClick={handleClick}
        >
            <Icon name="autorenew" size={48} />
        </button>
    );
};

export { ReGambleButton };
