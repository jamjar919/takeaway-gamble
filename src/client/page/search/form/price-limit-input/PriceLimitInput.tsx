import {Field, useFormikContext} from "formik";
import React from "react";
import {SearchPageFormField} from "../SearchPageForm";

import styles from './PriceLimitInput.scss';
import {AsciiLoader} from "../../../../framework/ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../../../../framework/ascii-loader/AsciiLoaderTileset";

const PriceLimitInput = () => {
    const {
        isSubmitting
    } = useFormikContext();

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
                    { isSubmitting ? <AsciiLoader type={AsciiLoaderTilesetType.Sonar} /> : "Gamble!"}
                </button>
            </div>
        </div>
    )
}

export { PriceLimitInput };