import React from "react";
import {SearchPageForm, SearchPageFormField, SearchPageFormValues} from "./form/SearchPageForm";

import styles from './SearchPage.scss';

type SearchPageType = {
    onSearch: (price: number) => Promise<void>,
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
                        const price = Number(values[SearchPageFormField.PRICE_LIMIT]) * 100;

                        return onSearch(
                            price
                        )
                    }}
                />
            </div>
        </div>
    )
}

export { SearchPage };