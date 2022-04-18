import React from "react";
import {DeliverooAddress} from "../../../server/type/deliveroo/DeliverooAddress";

import styles from './Address.scss';

type AddressProps = {
    value: DeliverooAddress
}

const renderAddressLine = (line?: string | null) =>
    line ? <span className={styles.addressLine}>{line}</span> : ''

/** Renders a dash seperated address */
const Address: React.FC<AddressProps> = ({ value }) => {
    return (
        <address className={styles.address}>
            {renderAddressLine(value?.address1)}
        </address>
    )
};

export { Address }