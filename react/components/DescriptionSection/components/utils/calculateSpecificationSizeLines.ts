export default function calculateSpecificationSizeLines(data?: unknown[]) {
    if (!data?.length) return 0;
    return 90 + data.length * 60;
}
