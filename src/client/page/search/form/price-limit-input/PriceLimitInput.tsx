import {Field} from "formik";
import React from "react";
import {SearchPageFormField} from "../SearchPageForm";

import styles from './PriceLimitInput.scss';

const PriceLimitInput = () => {
    return (
        <div className={styles.inputContainer}>
            <div className={styles.unit}>£</div>
            <Field
                className={styles.input}
                name={SearchPageFormField.PRICE_LIMIT}
                type="numeric"
                placeholder="12.00"
            />
            <div className={styles.buttonContainer}>
                <button
                    type="submit"
                    className={styles.button}
                >
                    Gamble!
                </button>
            </div>
        </div>
    )
}

export { PriceLimitInput };