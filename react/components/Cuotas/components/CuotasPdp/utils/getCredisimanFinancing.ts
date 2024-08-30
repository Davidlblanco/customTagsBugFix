import { useProduct } from "vtex.product-context";
import { CommercialOffer, Installment } from "vtex.product-context/react/ProductTypes";

export function getCredisimanFinancing(bestInstallment?: number): Financing | null {
    const productSelected = useProduct()?.selectedItem;
    const productCommertialOffer = productSelected?.sellers?.[0]?.commertialOffer;
    const installments = productCommertialOffer?.Installments;
    const credisimanInstallments =
        installments?.filter(
            (installment) =>
                installment?.PaymentSystemName.includes("Credisiman") &&
                installment?.PaymentSystemName.includes("Financiadas")
        ) ?? [];

    for (const installment of credisimanInstallments) {
        if (bestInstallment && installment?.NumberOfInstallments === bestInstallment) {
            return formatCredisimanFinancing(productCommertialOffer!, installment);
        }
    }

    return null;
}

function formatCredisimanFinancing(commercialOffer: CommercialOffer, maxInterestRate: Installment): Financing {
    const totalValuePlusInterestRate = maxInterestRate?.TotalValuePlusInterestRate;
    const price = commercialOffer?.Price;
    const interestRate = price > 0 ? ((totalValuePlusInterestRate - price) / price) * 100 : 0;
    const financing: Financing = {
        interestRate: Math.round(interestRate * 100) / 100,
        fullCredit: totalValuePlusInterestRate,
        totalInterest: totalValuePlusInterestRate - price,
        installmentValue: maxInterestRate.Value,
        numberOfInstallments: maxInterestRate.NumberOfInstallments,
    };

    return financing;
}

export type Financing = {
    interestRate: number;
    fullCredit: number;
    totalInterest: number;
    installmentValue?: number;
    numberOfInstallments?: number;
};
