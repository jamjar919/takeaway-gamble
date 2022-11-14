import styles from "./BasketItem.scss";
import { Price } from "../../../../../framework/price/Price";
import React from "react";
import { SelectedModifierWebModel } from "../../../../../../common/type/SelectedRestaurantAndItemsWebModel";

type ModifiersProps = {
    modifiers: SelectedModifierWebModel[];
};

const Modifiers: React.FC<ModifiersProps> = (props) => {
    const { modifiers } = props;

    return (
        <ul className={styles.modifiers}>
            {modifiers.map((modifier) => (
                <li key={modifier.group.id} className={styles.modifierGroup}>
                    <div className={styles.modifierGroupName}>
                        {modifier.group.name}
                    </div>
                    <ul className={styles.modifierOptionList}>
                        {modifier.options.map((option) => (
                            <li
                                key={option.id}
                                className={styles.modifierOption}
                            >
                                <span className={styles.modifierOptionName}>
                                    {option.name}
                                </span>
                                <span>
                                    <Price value={option} />
                                </span>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export { Modifiers };
