import React from "react";
import {SearchPageForm, SearchPageFormField, SearchPageFormValues} from "./form/SearchPageForm";
import {useGambleContext} from "../../context/GambleContext";

import styles from './SearchPage.scss';

const SearchPage: React.FC = () => {
    const {
        gamble,
    } = useGambleContext();

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <SearchPageForm
                    onSubmit={(values: SearchPageFormValues) => {
                        const postcode = values[SearchPageFormField.POSTCODE];
                        const price = Number(values[SearchPageFormField.PRICE_LIMIT]) * 100;
                        const firstItemIsLarge = values[SearchPageFormField.FIRST_ITEM_IS_LARGE];

                        return gamble(
                            postcode,
                            price,
                            firstItemIsLarge
                        )
                    }}
                />
            </div>
        </div>
    )
}

export { SearchPage };