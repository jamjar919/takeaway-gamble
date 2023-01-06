import React, { useState } from "react";
import { Form, Formik } from "formik";

import { LocalStorageKey } from "../../../framework/localstorage/LocalStorageKey";
import { Logo } from "../../../framework/logo/Logo";
import { SearchError } from "../search-error/SearchError";

import styles from "./SearchPageForm.scss";
import { TextInput } from "../../../framework/input/text/TextInput";
import { AsciiLoader } from "../../../framework/ascii-loader/AsciiLoader";
import { AsciiLoaderTilesetType } from "../../../framework/ascii-loader/AsciiLoaderTileset";
import { Accordion } from "../../../framework/accordion/Accordion";
import { NumberInput } from "../../../framework/input/number/NumberInput";

enum SearchPageFormField {
    POSTCODE = "POSTCODE",
    PRICE_LIMIT = "PRICE_LIMIT",
    NUM_PEOPLE = "NUM_PEOPLE",
}

type SearchPageFormValues = {
    [SearchPageFormField.POSTCODE]: string;
    [SearchPageFormField.PRICE_LIMIT]: string;
    [SearchPageFormField.NUM_PEOPLE]: number;
};

const getInitialValues = (): SearchPageFormValues => {
    return {
        [SearchPageFormField.POSTCODE]:
            localStorage.getItem(LocalStorageKey.POSTCODE) ?? "",
        [SearchPageFormField.PRICE_LIMIT]:
            localStorage.getItem(LocalStorageKey.PRICE_LIMIT) ?? "12.00",
        [SearchPageFormField.NUM_PEOPLE]: Number(localStorage.getItem(LocalStorageKey.NUM_PEOPLE)) ?? 1,
    };
};

type SearchPageFormProps = {
    onSubmit: (formValues: SearchPageFormValues) => Promise<void>;
};

const SearchPageForm: React.FC<SearchPageFormProps> = (props) => {
    const { onSubmit } = props;

    const [additionalOptionsOpen, setAdditionalOptionsOpen] = useState(false);

    return (
        <Formik
            initialValues={getInitialValues()}
            onSubmit={(values: SearchPageFormValues, formikHelpers) => {
                localStorage.setItem(
                    LocalStorageKey.POSTCODE,
                    values[SearchPageFormField.POSTCODE]
                );
                localStorage.setItem(
                    LocalStorageKey.PRICE_LIMIT,
                    values[SearchPageFormField.PRICE_LIMIT]
                );
                localStorage.setItem(
                    LocalStorageKey.NUM_PEOPLE,
                    String(values[SearchPageFormField.NUM_PEOPLE])
                );

                onSubmit(values).finally(() => formikHelpers.setSubmitting(false));
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className={styles.logoContainer}>
                        <Logo size={"lg"} superSpin={isSubmitting} />
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
                                {isSubmitting ? (
                                    <AsciiLoader
                                        type={AsciiLoaderTilesetType.Sonar}
                                    />
                                ) : (
                                    "Gamble!"
                                )}
                            </button>
                        }
                    />
                    <Accordion
                        title={"Options"}
                        showHeader={!additionalOptionsOpen}
                        open={additionalOptionsOpen}
                        onToggle={() => setAdditionalOptionsOpen(!additionalOptionsOpen)}
                    >
                        <NumberInput
                            name={SearchPageFormField.NUM_PEOPLE}
                            label="How many eating?"
                        />
                    </Accordion>
                </Form>
            )}
        </Formik>
    );
};

export { SearchPageForm, SearchPageFormValues, SearchPageFormField };
