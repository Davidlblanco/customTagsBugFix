import { getBestPayment } from "../../../hooks/useProductPayments";
import { BestInstallment, Results } from "../../../Types/Results";

export function getCredisimanFinancing(credisimanResults: Results[], interestRate?: number): Financing | null {
    const credisiman = credisimanResults?.filter((item) => item?.paymentId === "406" && item?.isValid);
    const bestInstallment = getBestPayment(credisiman ?? [])?.bestInstallment;
    return bestInstallment ? formatCredisimanFinancing(bestInstallment, interestRate) : null;
}

function formatCredisimanFinancing(bestInstallment?: BestInstallment, interestRatePercentage?: number): Financing {
    const numberOfInstallments = bestInstallment?.installment ?? 0;
    const principal = (bestInstallment?.installmentPrice ?? 0) * numberOfInstallments / 100;

    const dailyInterestRate = (interestRatePercentage ?? 0) / 365;
    let monthlyInterestRate = (dailyInterestRate * 30 * 1.13) / 100;
    monthlyInterestRate = truncateDecimals(monthlyInterestRate, 5);

    let cuota = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfInstallments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfInstallments) - 1);
    cuota = truncateDecimals(cuota, 2);

    const fullCredit = cuota * numberOfInstallments;

    const financing: Financing = {
        interestRate: interestRatePercentage ?? 0,
        fullCredit: truncateDecimals(fullCredit, 2),
        totalInterest: truncateDecimals(fullCredit - principal, 2),
        installmentValue: cuota,
        numberOfInstallments: numberOfInstallments
    };

    return financing;
}

function truncateDecimals(value: number, quantity: number): number {
    const factor = Math.pow(10, quantity);
    return Math.floor(value * factor) / factor;
}

export type Financing = {
    interestRate: number;
    fullCredit: number;
    totalInterest: number;
    installmentValue?: number;
    numberOfInstallments?: number;
};