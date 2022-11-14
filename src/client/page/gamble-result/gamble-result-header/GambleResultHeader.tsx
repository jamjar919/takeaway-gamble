import React from "react";
import { Logo } from "../../../framework/logo/Logo";
import { Address } from "../../../framework/address/Address";

import styles from "./GambleResultHeader.scss";
import pageStyles from "../GambleResultPage.scss";
import { Link } from "react-router-dom";
import { Endpoints } from "../../../../common/Endpoints";
import { ReGambleButton } from "./header-buttons/regamble-button/ReGambleButton";
import { BackToSearchButton } from "./header-buttons/back-to-search-button/BackToSearchButton";

type GambleResultHeaderProps = {
    name: string;
    address: string;
    url: string;
};

const GambleResultHeader: React.FC<GambleResultHeaderProps> = (props) => {
    const { name, address, url } = props;

    return (
        <div className={styles.menu}>
            <div className={pageStyles.container}>
                <div className={styles.menuItemContainer}>
                    <Link to={Endpoints.SEARCH} className={styles.logoWrapper}>
                        <Logo size={"sm"} />
                    </Link>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>
                            <a
                                href={`https://deliveroo.co.uk${url}`}
                                target="_blank"
                            >
                                {name}
                            </a>
                        </h1>
                        <Address value={address} />
                    </div>
                    <div className={styles.buttonContainer}>
                        <ReGambleButton />
                        <BackToSearchButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { GambleResultHeader };
