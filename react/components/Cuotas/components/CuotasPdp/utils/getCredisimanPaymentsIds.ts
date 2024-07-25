export const getCredisimanPaymentsIds = (account: string): string[] => {
    const countryAccount: string = account ?? "siman";
    const prodCredisimanIDs = ["401", "404", "405"];
    const qaCredisimanIDs = ["402", "403", "405"];

    return countryAccount.includes("qa") ? qaCredisimanIDs : prodCredisimanIDs;
}