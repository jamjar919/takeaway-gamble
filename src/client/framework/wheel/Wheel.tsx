import React from "react";
import { Coords } from "./Coords";
import { WheelSegment } from "./WheelSegment";

type WheelItem = {
    label: string;
    color?: string;
};

type WheelProps = {
    /** Items for the wheel */
    items: WheelItem[];
    /** Size in px */
    size: number;
};

/**
 * I tried to make a roulette wheel but it turns out with 300 options
 * you can't see any of the options. Shelved for now.
 */
const Wheel: React.FC<WheelProps> = (props) => {
    const { items, size } = props;

    const svgSize = size + 10;

    const center: Coords = {
        x: size / 2 + 5,
        y: size / 2 + 5,
    };

    const segments = items.map((item, idx) => {
        return (
            <WheelSegment
                id={idx}
                numSegments={items.length}
                key={item.label}
            />
        );
    });

    return (
        <svg
            width={svgSize}
            height={svgSize}
            viewBox="-1 -1 2 2"
            style={{ transform: "rotate(-0.25turn)" }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx={center.x}
                cy={center.y}
                r={size / 2}
                fill="none"
                stroke="black"
                strokeWidth="5px"
            />
            {segments}
        </svg>
    );
};

export { Wheel };
