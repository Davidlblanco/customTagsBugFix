import { BestInstallment } from "../../../Types/BestInstallment";
import { Results } from "../../../Types/Results";
import { getCredisimanFinancing } from "./getCredisimanFinancing";
import { getBestPayment } from "../../../hooks/useProductPayments";

export const bestInstallmentValues = (
    bestInstallment: BestInstallment,
    results: Results[]
): BestInstallmentValues => {
    const installment = bestInstallment?.installment;
    const credisimanFinancing = getCredisimanFinancing(installment);
    const bestInstallmentWhithOutFinancing = getBestPayment(results, false)?.bestInstallment;

    let values: BestInstallmentValues = {};

    if (credisimanFinancing) {
        values = {
            installment: credisimanFinancing?.numberOfInstallments,
            installmentPrice: parseFloat((credisimanFinancing?.installmentValue ?? 0 / 100).toFixed(2))
        };
    } else {
        values = {
            installment: bestInstallmentWhithOutFinancing?.installment,
            installmentPrice: parseFloat(((bestInstallmentWhithOutFinancing?.installmentPrice ?? 0) / 100).toFixed(2))
        };
    }

    return values;
};

type BestInstallmentValues = {
    installment?: number;
    installmentPrice?: number;
};