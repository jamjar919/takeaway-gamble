import React from "react";
import {Form, Formik} from "formik";

import {LocalStorageKey} from "../../../framework/localstorage/LocalStorageKey";
import {AsciiLoader} from "../../../framework/ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../../../framework/ascii-loader/AsciiLoaderTileset";
import {TextInput} from "../../../framework/input/text/TextInput";

import styles from "./ReGambleForm.scss";

enum ReGambleFormField {
    PRICE_LIMIT = 'PRICE_LIMIT',
    FIRST_ITEM_IS_LARGE = 'FIRST_ITEM_IS_LARGE'
}

type ReGambleFormFieldValues = {
    [ReGambleFormField.PRICE_LIMIT]: string;
    [ReGambleFormField.FIRST_ITEM_IS_LARGE]: boolean
}

const getInitialValues = (): ReGambleFormFieldValues => {
    return {
        [ReGambleFormField.PRICE_LIMIT]: localStorage.getItem(LocalStorageKey.PRICE_LIMIT) ?? '12.00',
        [ReGambleFormField.FIRST_ITEM_IS_LARGE]: true
    }
};

type ReGambleFormProps = {
    onSubmit: (values: ReGambleFormFieldValues) => Promise<void>;
}

/**
 * Small compact form to submit just a price limit
 * @constructor
 */
const ReGambleForm: React.FC<ReGambleFormProps> = (props) => {
    const { onSubmit } = props;

    return (
        <Formik
            initialValues={getInitialValues()}
            onSubmit={(values: ReGambleFormFieldValues, formikHelpers) => {
                localStorage.setItem(LocalStorageKey.PRICE_LIMIT, values[ReGambleFormField.PRICE_LIMIT]);

                onSubmit(values)
                    .then(() => formikHelpers.setSubmitting(false));
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <TextInput
                        className={styles.input}
                        name={ReGambleFormField.PRICE_LIMIT}
                        type="numeric"
                        placeholder="12.00"
                        left={<div className={styles.unit}>£</div>}
                        right={
                            <button
                                type="submit"
                                className={styles.button}
                                disabled={isSubmitting}
                            >
                                { isSubmitting ? <AsciiLoader type={AsciiLoaderTilesetType.Sonar} /> : "Try Again?"}
                            </button>
                        }
                    />
                </Form>
            )}
        </Formik>
    )
}

export { ReGambleForm, ReGambleFormField };
