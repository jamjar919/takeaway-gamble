import React, { useEffect, useRef } from "react";
import {
    AsciiLoaderTileset,
    AsciiLoaderTilesetType,
} from "./AsciiLoaderTileset";

type AsciiLoaderProps = {
    type: AsciiLoaderTilesetType;
    interval?: number;
};

/**
 * Renders the tiles from the tileset into a container with the interval
 */
const AsciiLoader: React.FC<AsciiLoaderProps> = (props) => {
    const { type, interval } = props;

    const ref = useRef<HTMLSpanElement>(null);

    const tiles = AsciiLoaderTileset[type];

    useEffect(() => {
        let frame = 0;

        const id = setInterval(() => {
            if (ref?.current) {
                frame += 1;

                if (frame >= tiles.length) {
                    frame = 0;
                }

                ref.current.innerText = tiles[frame];
            }
        }, interval);

        return () => {
            clearInterval(id);

            if (ref?.current) {
                ref.current.innerText = "";
            }
        };
    }, [ref, type, interval]);

    return <span ref={ref}>{tiles[0]}</span>;
};

AsciiLoader.defaultProps = {
    interval: 100,
};

export { AsciiLoader };
