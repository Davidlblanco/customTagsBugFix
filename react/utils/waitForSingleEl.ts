export default function waitForSingleEl(selector: string, timeout = 100) {
    return new Promise<Element>(resolve => {
        const waitForSingleEl = () => {
            const el = document.querySelector(selector);
            if (el) {
                resolve(el);
            } else {
                setTimeout(waitForSingleEl, timeout);
            }
        };
        waitForSingleEl();
    });
}
