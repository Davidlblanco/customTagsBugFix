export const calculateSizeLines = (text: string) => {
    var numLines = Math.ceil(text?.length / 97);
    var lineSize = numLines * 24;
    return lineSize;
}