import React from "react";

import {useAppContext} from "../../context/AppContext";
import {GambleResult} from "./gamble-result/GambleResult";

import styles from './SearchPage.scss';

const SearchPage: React.FC = () => {

    const {
        gamble,
        gambleResult
    } = useAppContext();

    return (
        <div className={styles.container}>
            {gambleResult && <GambleResult result={gambleResult} />}
            <button onClick={gamble}>gamble!</button>
        </div>
    )
}

export { SearchPage };