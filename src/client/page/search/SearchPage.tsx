import React from "react";
import {
    SearchPageForm,
    SearchPageFormField,
    SearchPageFormValues,
} from "./form/SearchPageForm";
import { useGambleContext } from "../../context/GambleContext";

import styles from "./SearchPage.scss";
import { FooterContent } from "../../framework/footer/FooterContent";

const SearchPage: React.FC = () => {
    const { postcodeGamble } = useGambleContext();

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <div className={styles.formWrapper}>
                    <SearchPageForm
                        onSubmit={(values: SearchPageFormValues) => {
                            const postcode =
                                values[SearchPageFormField.POSTCODE];
                            const price =
                                Number(
                                    values[SearchPageFormField.PRICE_LIMIT]
                                ) * 100;
                            const numPeople =
                                values[SearchPageFormField.NUM_PEOPLE];
                            const cuisine =
                                values[SearchPageFormField.CUISINE];
                            const maxDeliveryMinutes =
                                values[SearchPageFormField.MAX_DELIVERY_MINUTES];

                            return postcodeGamble(
                                postcode,
                                price,
                                numPeople,
                                cuisine,
                                maxDeliveryMinutes
                            );
                        }}
                    />
                </div>
            </div>
            <div className={styles.about}>
                <strong>What's this?</strong> - Generate a random takeaway in
                your area from Deliveroo or Just Eat - Just enter your postcode
                and how much you'd like to spend.
            </div>
            <div className={styles.footer}>
                <FooterContent />
            </div>
        </div>
    );
};

export { SearchPage };
