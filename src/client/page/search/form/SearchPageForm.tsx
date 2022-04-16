import {Form, Formik} from "formik";
import React from "react";
import {PriceLimitInput} from "./price-limit-input/PriceLimitInput";

enum SearchPageFormField {
    PRICE_LIMIT = 'PRICE_LIMIT'
}

type SearchPageFormValues = {
    [SearchPageFormField.PRICE_LIMIT]: string
}

type SearchPageFormProps = {
    onSubmit: (formValues: SearchPageFormValues) => Promise<void>
}

const searchPageFormInitialValues: SearchPageFormValues = {
    [SearchPageFormField.PRICE_LIMIT]: '12.00'
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
            </Form>
        </Formik>
    )
}

export { SearchPageForm, SearchPageFormValues, SearchPageFormField }