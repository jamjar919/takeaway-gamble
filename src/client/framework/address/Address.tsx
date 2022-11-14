import React from "react";

import styles from "./Address.scss";

type AddressProps = {
    value: string;
};

/** Renders a dash seperated address */
const Address: React.FC<AddressProps> = ({ value }) => {
    return (
        <address className={styles.address}>
            {value}
        </address>
    );
};

export { Address };
