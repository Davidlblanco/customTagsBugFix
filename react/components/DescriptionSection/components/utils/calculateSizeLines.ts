export const calculateSizeLines = (text: string) => {
    let numLines = Math.ceil(text?.length / 60);
    let lineSize = numLines * 24;
    return lineSize;
};
