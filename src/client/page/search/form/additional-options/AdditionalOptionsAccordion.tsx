import { Accordion } from "../../../../framework/accordion/Accordion";
import { NumberInput } from "../../../../framework/input/number/NumberInput";
import React, { useState } from "react";
import { SearchPageFormField } from "../SearchPageForm";
import { AdditionalOptionsAccordionHeader } from "./header/AdditionalOptionsAccordionHeader";
import { Select } from "../../../../framework/input/select/Select";
import { CuisineOptions } from "./CuisineOptions";

import styles from "./AdditionalOptionsAccordion.scss";

const AdditionalOptionsAccordion: React.FC = () => {
    const [additionalOptionsOpen, setAdditionalOptionsOpen] = useState(false);

    return (
        <Accordion
            title={<AdditionalOptionsAccordionHeader />}
            showHeader={!additionalOptionsOpen}
            open={additionalOptionsOpen}
            onToggle={() => setAdditionalOptionsOpen(!additionalOptionsOpen)}
            showToggle={false}
        >
            <div className={styles.additionalOption}>
                <NumberInput
                    name={SearchPageFormField.NUM_PEOPLE}
                    label="How many eating?"
                />
            </div>
            <div className={styles.additionalOption}>
                <Select
                    name={SearchPageFormField.CUISINE}
                    options={Object.entries(CuisineOptions)
                        .map(([value ,{ label }]) => ({
                            value,
                            label
                        }))
                    }
                />
            </div>
            <div className={styles.additionalOption}>
                <Select
                    name={SearchPageFormField.MAX_DELIVERY_MINUTES}
                    options={[
                        { value: 20, label: '20 minutes' },
                        { value: 30, label: '30 minutes' },
                        { value: 45, label: '45 minutes' },
                        { value: 60, label: '60 minutes' },
                        { value: 90, label: '90 minutes' }
                    ]}
                />
            </div>
        </Accordion>
    );
};

export { AdditionalOptionsAccordion };
