import React from "react";

type WheelSegmentProps = {
  /** Segment id, number 0-max, unique */
  id: number;
  /** The maximum number of segments, used to calculate the required angle */
  numSegments: number;
};

const WheelSegment: React.FC<WheelSegmentProps> = (props) => {
  const { id, numSegments } = props;

  const x = Math.cos(2 * Math.PI * (1 / numSegments));
  const y = Math.sin(2 * Math.PI * (1 / numSegments));

  return (
    <path
      d={`M 1 0 A 1 1 0 0 1 ${x} ${y} L 0 0`}
      style={{
        transform: `rotate(-${id / numSegments}turn)`,
        fill: id % 2 === 0 ? "black" : "red",
      }}
    />
  );
};

export { WheelSegment };
