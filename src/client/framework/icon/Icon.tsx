import React from "react";

type IconProps = {
    name: string;
    size?: 18 | 24 | 36 | 48
}

const Icon: React.FC<IconProps> = (props) => {
    const { name, size } = props;

    return (
        <span className="material-icons" style={{ fontSize: `${size}px` }}>
            {name}
        </span>
    );
}

Icon.defaultProps = {
    size: 24
}

export { Icon }