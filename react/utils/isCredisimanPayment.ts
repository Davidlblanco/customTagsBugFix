const prodCredisimanIDs = ["401", "404", "406"];

const qaCredisimanIDs = ["402", "403", "406"];

export default function isCredisimanPayment(paymentId: string, account: string) {
    const credisimanList = account.toLowerCase().includes("qa") ? qaCredisimanIDs : prodCredisimanIDs;

    return credisimanList.includes(paymentId);
}