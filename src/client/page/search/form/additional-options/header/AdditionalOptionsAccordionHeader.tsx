import React from "react";
import { Badge } from "../../../../../framework/badge/Badge";
import { useFormikContext } from "formik";
import {
    SearchPageFormField,
    SearchPageFormValues,
} from "../../SearchPageForm";
import { BadgeRow } from "../../../../../framework/badge-row/BadgeRow";
import { CuisineOptions } from "../CuisineOptions";

import styles from "./AdditionalOptionsAccordionHeader.scss";
import { Cuisine } from "../../../../../../common/type/Cuisine";

const AdditionalOptionsAccordionHeader: React.FC = () => {
    const { values } = useFormikContext<SearchPageFormValues>();

    const cuisine = CuisineOptions[
        values[SearchPageFormField.CUISINE] as Cuisine
    ].label;

    return (
        <div className={styles.accordionOptionsHeader}>
            <BadgeRow>
                <Badge iconName={"person"}>
                    {values[SearchPageFormField.NUM_PEOPLE]}
                </Badge>
                <Badge iconName={"restaurant_menu"}>
                    {cuisine}
                </Badge>
                <Badge iconName={"schedule"}>
                    {values[SearchPageFormField.MAX_DELIVERY_MINUTES]}m
                </Badge>
            </BadgeRow>
        </div>
    );
};

export { AdditionalOptionsAccordionHeader };
