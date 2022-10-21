import React from "react";
import {Form, Formik} from "formik";

import {PriceLimitInput} from "./price-limit-input/PriceLimitInput";
import {Checkbox} from "./checkbox/Checkbox";
import {PostcodeInput} from "./postcode-input/PostcodeInput";
import {LocalStorageKey} from "../../../framework/localstorage/LocalStorageKey";
import {Logo} from "../../../framework/logo/Logo";
import {SearchError} from "../search-error/SearchError";

import styles from './SearchPageForm.scss';

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
        [SearchPageFormField.PRICE_LIMIT]: '12.00',
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
                onSubmit(values)
                    .then(() => formikHelpers.setSubmitting(false));
            }}
        >
            {(formik) => (
                <Form>
                    <div className={styles.logoContainer}>
                        <Logo
                            size={"lg"}
                            superSpin={formik.isSubmitting}
                        />
                    </div>
                    <SearchError />
                    <PostcodeInput />
                    <PriceLimitInput />
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