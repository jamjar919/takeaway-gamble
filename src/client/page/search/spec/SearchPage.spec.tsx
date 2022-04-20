import React from "react";
import {SearchPage} from "../SearchPage";
import {validateRender} from "../../../../../test/validateRender";

describe('SearchPage', () => {
    it('renders', () => {
        validateRender(<SearchPage
            onSearch={() => Promise.resolve()}
        />);
    });
});