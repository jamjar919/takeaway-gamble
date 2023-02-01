import React from "react";
import { SearchPageFormField } from "../../SearchPageForm";
import { Select } from "../../../../../framework/input/select/Select";
import { CuisineOptions } from "./CuisineOptions";

import styles from './CuisineSelect.scss';

const options = Object.entries(CuisineOptions)
    .map(([value ,{ label }]) => ({
        value,
        label
    }));

const CuisineSelect: React.FC = () => {

    return (
        <div className={styles.cuisineSelect}>
            <label className={styles.label} htmlFor={SearchPageFormField.CUISINE}>Cuisine filter: </label>
            <Select
                name={SearchPageFormField.CUISINE}
                options={options}
            />
        </div>
    )
}

export { CuisineSelect }