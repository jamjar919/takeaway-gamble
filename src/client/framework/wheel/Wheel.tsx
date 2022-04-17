import React, {useRef} from "react";

type WheelItem = {
    label: string,
    color?: string;
}

type WheelProps = {
    /** Items for the wheel */
    items: WheelItem[],
    /** Size in px */
    size: number
}

const Wheel: React.FC<WheelProps> = (props) => {
    const {
        items,
        size
    } = props;

    const svgSize = size + 10

    const centerCoords = {
        x: size/2 + 5,
        y: size/2 + 5
    }

    return (
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} xmlns="http://www.w3.org/2000/svg">
            <circle
                cx={centerCoords.x}
                cy={centerCoords.y}
                r={size/2}
                fill="none"
                stroke="black"
                strokeWidth="5px"
            />
        </svg>
    )
}

export { Wheel };