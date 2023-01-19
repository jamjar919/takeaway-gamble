import { Accordion } from "../../../../framework/accordion/Accordion";
import { NumberInput } from "../../../../framework/input/number/NumberInput";
import React, { useState } from "react";
import { SearchPageFormField } from "../SearchPageForm";
import { AdditionalOptionsAccordionHeader } from "./header/AdditionalOptionsAccordionHeader";

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
            <NumberInput
                name={SearchPageFormField.NUM_PEOPLE}
                label="How many eating?"
            />
        </Accordion>
    );
};

export { AdditionalOptionsAccordion };
