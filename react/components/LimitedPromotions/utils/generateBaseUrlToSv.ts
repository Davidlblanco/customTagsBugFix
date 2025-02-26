export default function generateBaseUrlToSV(account: string, workspace: string) {
    let host = `${workspace ?? ""}--${account}`;
    const isSVAccount = account === "siman" || account === "simanqa";

    if (!isSVAccount) {
        host = account.includes("qa") ? "simanqa" : "siman";
    }

    return `https://${host}.myvtex.com`;
}
