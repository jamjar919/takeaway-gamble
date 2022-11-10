import React from "react";
import { useGambleContext } from "../../../context/GambleContext";

import styles from "./SearchError.scss";

const SearchError: React.FC = () => {
  const { gambleResult } = useGambleContext();

  if (gambleResult?.type === "error") {
    const error = gambleResult.error;

    return <div className={styles.error}>{error}</div>;
  }

  return null;
};

export { SearchError };
