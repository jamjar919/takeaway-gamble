import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Endpoints } from "../../../../../../common/Endpoints";

import buttonStyles from "../HeaderButton.scss";
import backToSearchButtonStyles from "./BackToSearchButton.scss";
import { Icon } from "../../../../../framework/icon/Icon";

const BackToSearchButton: React.FC = () => {
    return (
        <Link
            to={Endpoints.SEARCH}
            className={classNames(
                buttonStyles.button,
                backToSearchButtonStyles.backToSearchButton
            )}
        >
            <Icon name="undo" size={48} />
        </Link>
    );
};

export { BackToSearchButton };
