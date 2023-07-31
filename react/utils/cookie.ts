import { canUseDOM } from "vtex.render-runtime";

export function setCookie(
    name: string,
    value: string,
    minutes?: number,
    days?: number
) {
    if(!canUseDOM) return;

    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    if (minutes) {
        const date = new Date();
        date.setTime(date.getTime() + minutes * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    window.document.cookie =
        name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = canUseDOM ? window.document.cookie.split(";") : "";
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function deleteCookie(name: string) {
    if (getCookie(name)) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
}
