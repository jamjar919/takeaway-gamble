import React from "react";
import {SearchPageForm, SearchPageFormField, SearchPageFormValues} from "./form/SearchPageForm";

import styles from './SearchPage.scss';

type SearchPageType = {
    onSearch: (postcode: string, price: number, firstItemIsLarge: boolean) => Promise<void>,
    error?: string;
}

const SearchPage: React.FC<SearchPageType> = (props) => {
    const {onSearch, error} = props;

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <img src={"/deliveroo-logo.png"} alt="Deliveroo Logo" className={styles.logo}/>
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}
                <SearchPageForm
                    onSubmit={(values: SearchPageFormValues) => {
                        const postcode = values[SearchPageFormField.POSTCODE];
                        const price = Number(values[SearchPageFormField.PRICE_LIMIT]) * 100;
                        const firstItemIsLarge = values[SearchPageFormField.FIRST_ITEM_IS_LARGE];

                        return onSearch(
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