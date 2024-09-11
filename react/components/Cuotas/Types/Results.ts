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
    bestInstallment: BestInstallment;
    tagsCuotas: TagCuotasValues[] | null;
    BankTypes: BankType[];
};



export type BestInstallment = {
    installment: number;
    valid: boolean;
    rulesResults: RuleResult<unknown>[];
    installmentPrice: number;
} | null;
