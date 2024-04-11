export default function addEventOnTarget(event: string, selector: string, callback: (e: Event) => void) {
    document.addEventListener(event, (e) => {
        if ((e.target as Element).matches(selector)) {
            callback(e);
        }
    });
}