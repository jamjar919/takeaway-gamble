import React from "react";
import {SearchPageForm, SearchPageFormField, SearchPageFormValues} from "./form/SearchPageForm";
import {useGambleContext} from "../../context/GambleContext";

import styles from './SearchPage.scss';

const SearchPage: React.FC = () => {
    const {
        postcodeGamble,
    } = useGambleContext();

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <SearchPageForm
                    onSubmit={(values: SearchPageFormValues) => {
                        const postcode = values[SearchPageFormField.POSTCODE];
                        const price = Number(values[SearchPageFormField.PRICE_LIMIT]) * 100;
                        const firstItemIsLarge = values[SearchPageFormField.FIRST_ITEM_IS_LARGE];

                        return postcodeGamble(
                            postcode,
                            price,
                            firstItemIsLarge
                        )
                    }}
                />
            </div>
            <div className={styles.footer}>
                <div className={styles.footerItem}>
                    Developed by <a href={"https://thejamespaterson.com"}>James Paterson</a>
                </div>
                <div className={styles.footerItem}>❂</div>
                <div className={styles.footerItem}>
                    Not affiliated with Deliveroo or Just Eat
                </div>
            </div>
        </div>
    )
}

export { SearchPage };