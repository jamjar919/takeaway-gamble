import React from "react";
import {Form, Formik} from "formik";

import {Checkbox} from "../../../framework/input/checkbox/Checkbox";
import {LocalStorageKey} from "../../../framework/localstorage/LocalStorageKey";
import {Logo} from "../../../framework/logo/Logo";
import {SearchError} from "../search-error/SearchError";

import styles from './SearchPageForm.scss';
import {TextInput} from "../../../framework/input/text/TextInput";
import {AsciiLoader} from "../../../framework/ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../../../framework/ascii-loader/AsciiLoaderTileset";

enum SearchPageFormField {
    POSTCODE = 'POSTCODE',
    PRICE_LIMIT = 'PRICE_LIMIT',
    FIRST_ITEM_IS_LARGE = 'FIRST_ITEM_IS_LARGE'
}

type SearchPageFormValues = {
    [SearchPageFormField.POSTCODE]: string;
    [SearchPageFormField.PRICE_LIMIT]: string;
    [SearchPageFormField.FIRST_ITEM_IS_LARGE]: boolean
}

const getInitialValues = (): SearchPageFormValues => {
    return {
        [SearchPageFormField.POSTCODE]: localStorage.getItem(LocalStorageKey.POSTCODE) ?? "",
        [SearchPageFormField.PRICE_LIMIT]: localStorage.getItem(LocalStorageKey.PRICE_LIMIT) ?? '12.00',
        [SearchPageFormField.FIRST_ITEM_IS_LARGE]: true
    }
};

type SearchPageFormProps = {
    onSubmit: (formValues: SearchPageFormValues) => Promise<void>
}

const SearchPageForm: React.FC<SearchPageFormProps> = (props) => {
    const { onSubmit } = props;

    return (
        <Formik
            initialValues={getInitialValues()}
            onSubmit={(values: SearchPageFormValues, formikHelpers) => {
                localStorage.setItem(LocalStorageKey.POSTCODE, values[SearchPageFormField.POSTCODE]);
                localStorage.setItem(LocalStorageKey.PRICE_LIMIT, values[SearchPageFormField.PRICE_LIMIT]);

                onSubmit(values)
                    .then(() => formikHelpers.setSubmitting(false));
            }}
        >
            {({ isSubmitting}) => (
                <Form>
                    <div className={styles.logoContainer}>
                        <Logo
                            size={"lg"}
                            superSpin={isSubmitting}
                        />
                    </div>
                    <SearchError />
                    <TextInput
                        name={SearchPageFormField.POSTCODE}
                        type="text"
                        placeholder="Postcode..."
                        left={<div className={styles.unit}>?</div>}
                    />
                    <TextInput
                        name={SearchPageFormField.PRICE_LIMIT}
                        type="numeric"
                        placeholder="12.00"
                        left={<div className={styles.unit}>£</div>}
                        right={
                            <button
                                type="submit"
                                className={styles.button}
                                disabled={isSubmitting}
                            >
                                { isSubmitting ? <AsciiLoader type={AsciiLoaderTilesetType.Sonar} /> : "Gamble!"}
                            </button>
                        }
                    />
                    <Checkbox
                        name={SearchPageFormField.FIRST_ITEM_IS_LARGE}
                        label={"Pick a large item for the first random selection"}
                    />
                </Form>
            )}
        </Formik>
    )
}

export { SearchPageForm, SearchPageFormValues, SearchPageFormField }