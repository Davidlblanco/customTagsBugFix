export default function calculateDescriptionSizeLines(text?: string) {
    if (!text) return 0;
    const whiteLines = text.split("\n").length;
    const lineWraps = text.length / 60;
    const numLines = lineWraps + whiteLines;
    return Math.ceil(numLines * 24 * 1.5);
}
