import { Accordion } from "../../../../framework/accordion/Accordion";
import { NumberInput } from "../../../../framework/input/number/NumberInput";
import { TextInput } from "../../../../framework/input/text/TextInput";
import React, { useState } from "react";
import { SearchPageFormField } from "../SearchPageForm";
import { AdditionalOptionsAccordionHeader } from "./header/AdditionalOptionsAccordionHeader";
import { CuisineSelect } from "./cuisine-selector/CuisineSelect";

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
            <CuisineSelect />
            <TextInput
                name={SearchPageFormField.MAX_DELIVERY_MINUTES}
                type="numeric"
                placeholder="30"
                left={<div>⏱</div>}
            />
        </Accordion>
    );
};

export { AdditionalOptionsAccordion };
