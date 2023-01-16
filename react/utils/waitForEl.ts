export default function waitForEl(selector: string, timeout = 100) {
    return new Promise<Element>(resolve => {
        const waitForElCb = () => {
            const el = document.querySelector(selector);
            if (el) {
                resolve(el);
            } else {
                setTimeout(waitForElCb, timeout);
            }
        };
        waitForElCb();
    });
}
