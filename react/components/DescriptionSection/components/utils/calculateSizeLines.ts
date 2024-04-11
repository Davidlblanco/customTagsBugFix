export const calculateSizeLines = (text: string) => {
    let numLines = Math.ceil(text?.length / 97);
    let lineSize = numLines * 24;
    return lineSize;
};
