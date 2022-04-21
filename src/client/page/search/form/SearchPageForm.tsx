import {Form, Formik} from "formik";
import React from "react";
import {PriceLimitInput} from "./price-limit-input/PriceLimitInput";
import {Checkbox} from "./checkbox/Checkbox";

enum SearchPageFormField {
    PRICE_LIMIT = 'PRICE_LIMIT',
    FIRST_ITEM_IS_LARGE = 'FIRST_ITEM_IS_LARGE'
}

type SearchPageFormValues = {
    [SearchPageFormField.PRICE_LIMIT]: string;
    [SearchPageFormField.FIRST_ITEM_IS_LARGE]: boolean
}

const searchPageFormInitialValues: SearchPageFormValues = {
    [SearchPageFormField.PRICE_LIMIT]: '12.00',
    [SearchPageFormField.FIRST_ITEM_IS_LARGE]: true
}

type SearchPageFormProps = {
    onSubmit: (formValues: SearchPageFormValues) => Promise<void>
}

const SearchPageForm: React.FC<SearchPageFormProps> = (props) => {
    const { onSubmit } = props;

    return (
        <Formik
            initialValues={searchPageFormInitialValues}
            onSubmit={(values: SearchPageFormValues, formikHelpers) => {
                onSubmit(values)
                    .then(() => formikHelpers.setSubmitting(false));
            }}
        >
            <Form>
                <PriceLimitInput />
                <Checkbox
                    name={SearchPageFormField.FIRST_ITEM_IS_LARGE}
                    label={"Pick a large item for the first random selection"}
                />
            </Form>
        </Formik>
    )
}

export { SearchPageForm, SearchPageFormValues, SearchPageFormField }