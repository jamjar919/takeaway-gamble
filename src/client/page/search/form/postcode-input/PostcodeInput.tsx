import {Field} from "formik";
import {SearchPageFormField} from "../SearchPageForm";
import React from "react";

import styles from '../SearchPageForm.scss';

const PostcodeInput: React.FC = () => {
    return (
        <div className={styles.inputContainer}>
            <div className={styles.unit}>⌂</div>
            <Field
                className={styles.input}
                name={SearchPageFormField.POSTCODE}
                type="text"
                placeholder="Postcode..."
            />
        </div>
    )
}

export { PostcodeInput }