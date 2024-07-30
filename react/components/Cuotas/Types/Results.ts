import { RuleResult } from "../Logic/PaymentCustomValidators";
import { BankType, TagCuotasValues } from "./PaymentCustom";

export type Results = {
    paymentId: string;
    isValid: boolean;
    installments: {
        installment: number;
        valid: boolean;
        rulesResults: RuleResult<unknown>[];
        installmentPrice: number;
    }[];
    bestInstallment: {
        installment: number;
        valid: boolean;
        rulesResults: RuleResult<unknown>[];
        installmentPrice: number;
    } | null;
    tagsCuotas: TagCuotasValues[] | null;
    BankTypes: BankType[];
};