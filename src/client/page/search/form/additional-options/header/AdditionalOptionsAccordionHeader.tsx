import React from "react";
import { Badge } from "../../../../../framework/badge/Badge";
import { useFormikContext } from "formik";
import {
    SearchPageFormField,
    SearchPageFormValues,
} from "../../SearchPageForm";

import styles from "./AdditionalOptionsAccordionHeader.scss";
import { BadgeRow } from "../../../../../framework/badge-row/BadgeRow";

const AdditionalOptionsAccordionHeader: React.FC = () => {
    const { values } = useFormikContext<SearchPageFormValues>();

    return (
        <div className={styles.accordionOptionsHeader}>
            <BadgeRow>
                <Badge iconName={"person"}>
                    {values[SearchPageFormField.NUM_PEOPLE]}
                </Badge>
                <Badge iconName={"restaurant_menu"}>All Cuisines</Badge>
            </BadgeRow>
        </div>
    );
};

export { AdditionalOptionsAccordionHeader };
