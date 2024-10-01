import { useRuntime } from "vtex.render-runtime";

export const getCredisimanPaymentsIds = (): string[] => {
    const { account } = useRuntime();
    const countryAccount: string = account ?? "siman";
    const prodCredisimanIDs = ["401", "404"];
    const qaCredisimanIDs = ["402", "403", "406"];

    return countryAccount.includes("qa") ? qaCredisimanIDs : prodCredisimanIDs;
};