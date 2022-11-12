enum AsciiLoaderTilesetType {
    Sonar = "Sonar",
    Circle = "Circle",
    Line = "Line",
}

const AsciiLoaderTileset: { [key in AsciiLoaderTilesetType]: string[] } = {
    [AsciiLoaderTilesetType.Sonar]: [
        "    .    ",
        "    o    ",
        "   (O)   ",
        "  (( ))  ",
        " ((( ))) ",
        "(((   )))",
        "((     ))",
        "(       )",
    ],
    [AsciiLoaderTilesetType.Circle]: ["◜", "◠", "◝", "◞", "◡", "◟"],
    [AsciiLoaderTilesetType.Line]: ["-", "\\", "|", "/"],
};

export { AsciiLoaderTilesetType, AsciiLoaderTileset };
