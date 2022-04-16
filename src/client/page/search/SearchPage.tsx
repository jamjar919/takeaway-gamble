import React from "react";

import styles from './SearchPage.scss';
import {useAppContext} from "../../context/AppContext";

const SearchPage: React.FC = () => {

    const {
        gamble,
        gambleResult
    } = useAppContext();

    return (
        <div className={styles.container}>
            {gambleResult && <div dangerouslySetInnerHTML={{__html: gambleResult}}/>}
            <button onClick={gamble}>gamble!</button>
        </div>
    )
}

export { SearchPage };