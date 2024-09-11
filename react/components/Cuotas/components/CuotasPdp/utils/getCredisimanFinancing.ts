import { getBestPayment } from "../../../hooks/useProductPayments";
import { BestInstallment, Results } from "../../../Types/Results";

export function getCredisimanFinancing(credisimanResults: Results[], interestRate?: number): Financing | null {
    const credisiman = credisimanResults?.filter((item) => item?.paymentId === "406" && item?.isValid);
    const bestInstallment = getBestPayment(credisiman ?? [])?.bestInstallment;
    return bestInstallment ? formatCredisimanFinancing(bestInstallment, interestRate) : null;
}

function formatCredisimanFinancing(bestInstallment?: BestInstallment, interestRatePercentage?: number): Financing {
    const numberOfInstallments = bestInstallment?.installment ?? 0;
    const price = (bestInstallment?.installmentPrice ?? 0) * numberOfInstallments / 100;
    const fullCredit = price + (price * (interestRatePercentage ?? 0) / 100);

    const financing: Financing = {
        interestRate: interestRatePercentage ?? 0,
        fullCredit: roundToTwoDecimals(fullCredit),
        totalInterest: roundToTwoDecimals(fullCredit - price),
        installmentValue: roundToTwoDecimals(fullCredit / numberOfInstallments),
        numberOfInstallments: numberOfInstallments,
    };

    return financing;
}

function roundToTwoDecimals(value: number): number {
    return parseFloat(value.toFixed(2));
}

export type Financing = {
    interestRate: number;
    fullCredit: number;
    totalInterest: number;
    installmentValue?: number;
    numberOfInstallments?: number;
};