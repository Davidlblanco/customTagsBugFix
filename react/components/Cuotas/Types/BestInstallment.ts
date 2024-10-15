import { RuleResult } from "../Logic/PaymentCustomValidators";

export type BestInstallment = {
    installment: number;
    valid: boolean;
    rulesResults: RuleResult<unknown>[];
    installmentPrice: number;
} | null | undefined;