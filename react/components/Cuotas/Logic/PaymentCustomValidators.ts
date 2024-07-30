import {
    ConditionStatement,
    PaymentConfig,
    PaymentConfigCondition,
    PaymentConfigRule,
    PaymentSellerCondition,
    RuleOperatorValue,
    RuleType,
    TagCuotasValues,
} from "../Types/PaymentCustom";
import { SelectedProductInfo } from "../hooks/useSelectedProductInfo";

export function validateConfig(
    config: PaymentConfig,
    productInfo: SelectedProductInfo
) {
    const configCheckCondition = removeOutOfDeadLineConditions(config);
    const sellerValid = validateSellerCondition(
        productInfo,
        config.sellerCondition
    );
    const conditions =
        configCheckCondition?.map((condition) =>
            validateCondition(condition, productInfo)
        ) ?? [];

    return {
        paymentId: config.paymentId,
        isValid: sellerValid && conditions?.some((x) => x?.valid), // At least one condition must be valid
        installments: conditions,
        bestInstallment: getBestInstallment(conditions),
        tagsCuotas: filterBestTags(config?.tagCuotas, conditions)
    };
}

// ------ Validate installment conditions ------ //

function removeOutOfDeadLineConditions(config: PaymentConfig) {
    const configCheckCondition = config?.conditions?.filter((condition) => {
        const { deadLine, noEndDate, startDate, endDate } = condition;
        const isThereStartDate = startDate !== "undefined";
        const isThereEndDate = endDate !== "undefined";
        const isThereStarAndEndDate = isThereStartDate && isThereEndDate;

        if (deadLine) {
            if ((noEndDate && isThereStartDate) || isThereStarAndEndDate) {
                return condition;
            }
        }
        return false;
    });

    return configCheckCondition;
}

function validateCondition(
    condition: PaymentConfigCondition,
    productInfo: SelectedProductInfo
) {
    const operator = condition.rulesOperator || "all";
    const rulesResults = condition.rules.map((rule) =>
        verifyRule(rule, productInfo)
    );

    const valid =
        operator == "all"
            ? rulesResults.every((x) => x.valid) // Every rule must be valid
            : rulesResults.some((x) => x.valid); // At least one rule must be valid

    return {
        installment: condition.installment,
        valid,
        rulesResults,
        installmentPrice: productInfo.totalPrice / condition.installment,
    };
}

// ------ Verify rules ------ //

function verifyRule(
    rule: PaymentConfigRule,
    productInfo: SelectedProductInfo
): RuleResult {
    switch (rule.type) {
        case "minimum_price":
            return verifyMinimumPrice(rule, productInfo);
        case "sku_category":
            return verifySkuCategory(rule, productInfo);
        case "sku_brand":
            return verifySkuBrand(rule, productInfo);
        case "sku_id":
            return verifySkuId(rule, productInfo);
        case "simanpro":
            return verifySimanpro(rule, productInfo);
        case "sku_collection":
            return verifySkuCollection(rule, productInfo);
        default:
            throw new Error(`Rule type ${rule.type} is not supported`);
    }
}

function validateSellerCondition(
    productInfo: SelectedProductInfo,
    sellerCondition?: PaymentSellerCondition
) {
    if (!sellerCondition?.statements) return true;

    const operator = sellerCondition.operator ?? "all";

    for (const statement of sellerCondition.statements) {
        const allowed = validateSellerStatement(statement, productInfo);

        if (operator === "any" && allowed) {
            return true;
        }
        if (operator === "all" && !allowed) {
            return false;
        }
    }

    return true;
}

function validateSellerStatement(
    statement: ConditionStatement,
    productInfo: SelectedProductInfo
) {
    const verb = statement.verb ?? "=";
    const object = statement.object as string;
    return applyOperator(isStringEqual(object, productInfo.sellerId), verb);
}

function verifyMinimumPrice(
    rule: PaymentConfigRule,
    productInfo: SelectedProductInfo
) {
    const minimumPrice = Number(rule.value);
    const value = productInfo.totalPrice;
    const valid = applyOperator(value >= minimumPrice, rule.operator);

    return {
        valid,
        type: rule.type,
        operator: rule.operator,
        value: value,
        ruleValue: [minimumPrice],
        matched: valid ? [rule.value] : [],
        unmatched: valid ? [] : [rule.value],
    };
}

function verifySkuCategory(
    rule: PaymentConfigRule,
    productInfo: SelectedProductInfo
) {
    const categories = parseStringToArray(rule.value as string);

    const value = productInfo.categoriesIds;
    const positiveMatches: string[] = [];
    const negativeMatches: string[] = [];

    const contains = categories.some((category) => {
        const hasCategory = value.some((pCategory) => {
            const matches = pCategory == category;
            matches
                ? positiveMatches.push(pCategory)
                : negativeMatches.push(pCategory);
            return matches;
        });
        return hasCategory;
    });

    return {
        valid: applyOperator(contains, rule.operator),
        type: rule.type,
        operator: rule.operator,
        value: value,
        ruleValue: categories,
        matched: rule.operator == "=" ? positiveMatches : negativeMatches,
        unmatched: rule.operator == "=" ? negativeMatches : positiveMatches,
    };
}

function verifySkuBrand(
    rule: PaymentConfigRule,
    productInfo: SelectedProductInfo
) {
    const brands = parseStringToArray(rule.value as string);

    const value = productInfo.brandId;
    const positiveMatches: string[] = [];
    const negativeMatches: string[] = [];

    const contains = brands.some((brand) => {
        const matches = isStringEqual(brand, value);
        matches ? positiveMatches.push(brand) : negativeMatches.push(brand);
        return matches;
    });

    return {
        valid: applyOperator(contains, rule.operator),
        type: rule.type,
        operator: rule.operator,
        value: value,
        ruleValue: brands,
        matched: rule.operator == "=" ? positiveMatches : negativeMatches,
        unmatched: rule.operator == "=" ? negativeMatches : positiveMatches,
    };
}

function verifySkuId(
    rule: PaymentConfigRule,
    productInfo: SelectedProductInfo
) {
    const ids = parseStringToArray(rule.value as string);

    const value = productInfo.skuId;

    const contains = ids.some((id) => {
        return isStringEqual(id, value);
    });

    return {
        valid: applyOperator(contains, rule.operator),
        type: rule.type,
        operator: rule.operator,
        value: value,
        ruleValue: ids,
        matched: contains ? [productInfo.skuId] : [],
        unmatched: contains ? [] : [productInfo.skuId],
    };
}

function verifySimanpro(
    rule: PaymentConfigRule,
    productInfo: SelectedProductInfo
) {
    const value = productInfo.simanpro.isActive;
    const contains = (rule.value as boolean) === value;
    const isValid = applyOperator(contains, rule.operator);

    return {
        valid: isValid,
        type: rule.type,
        operator: rule.operator,
        value: value,
        ruleValue: [rule.value],
        matched: contains ? [productInfo.simanpro.isActive] : [],
        unmatched: contains ? [] : [productInfo.simanpro.isActive],
    };
}

function verifySkuCollection(
    rule: PaymentConfigRule,
    productInfo: SelectedProductInfo
) {
    const collections = parseStringToArray(rule.value as string);
    const value = productInfo?.productClusters;

    const contains = collections.some((id) => {
        return value.includes(id);
    });

    return {
        valid: applyOperator(contains, rule.operator),
        type: rule.type,
        operator: rule.operator,
        value: value,
        ruleValue: collections,
        matched: contains ? value : [],
        unmatched: contains ? [] : value,
    };
}

// ------ Helpers ------

function applyOperator(equalResult: boolean, operator: "=" | "!=") {
    return operator === "=" ? equalResult : !equalResult;
}

function isStringEqual(str1: string, str2: string) {
    return removeWhiteSpace(str1) === removeWhiteSpace(str2);
}

function removeWhiteSpace(str?: string) {
    return str?.replace(/\s/g, "") ?? "";
}

function parseStringToArray(str: string) {
    return removeWhiteSpace(str)
        .split(",")
        .filter((x) => x);
}

function getBestInstallment(
    installments: InstallmentResult[]
): InstallmentResult | null {
    return installments.reduce((prev: InstallmentResult | null, current) => {
        // If the current installment is not valid, we ignore it
        if (!current?.valid) return prev;

        // If there is no previous installment, we return the current one
        if (!prev) return current;

        // If the current installment has a higher installment, we return the current one
        if (current?.installment > prev.installment) return current;

        // Otherwise we return the previous one
        return prev;
    }, null);
}


function filterBestTags(tags: TagCuotasValues[] | undefined, conditions: any[]): TagCuotasValues[] | null {
    if (!tags) return null;

    const result: { [key: string]: TagCuotasValues } = {};
    const now = new Date();
    let maxMonthsItemWithoutBank: TagCuotasValues | null = null;

    for (const tag of tags) {
        const bankId = tag.bank?.id;
        const active = tag?.active;
        const monthsValue = tag?.months?.value;
        const startDate = new Date(tag?.deadlineTag?.startDate as string);
        const endDate = tag?.deadlineTag?.endDate ? new Date(tag.deadlineTag.endDate) : null;
        const noEndDate = tag?.deadlineTag?.noEndDate;
        if (active == true && now >= startDate && (noEndDate || (endDate && now <= endDate))) {
            if (bankId) {
                if (!result[bankId] || result[bankId].months.value < monthsValue) {

                    const shouldIncludeTag = conditions.some((condition) => (tag.months.value == condition.installment) && condition.valid)
                    
                    if(shouldIncludeTag) result[bankId] = tag;
                }
            } else {
                if (!maxMonthsItemWithoutBank || maxMonthsItemWithoutBank.months.value < monthsValue) {
                    maxMonthsItemWithoutBank = tag;
                }
            }
        }
    }

    const filteredResult = Object.values(result);

    if (maxMonthsItemWithoutBank) {
        filteredResult.push(maxMonthsItemWithoutBank);
    }

    // Sort the array by months in descending order
    filteredResult?.sort((a, b) => b.months.value - a.months.value);

    return filteredResult;
}

export interface RuleResult<T = unknown> {
    valid: boolean;
    type: RuleType;
    value: T;
    ruleValue: Array<T>;
    operator: RuleOperatorValue;
    matched: Array<T>;
    unmatched: Array<T>;
}

export type InstallmentResult = ReturnType<typeof validateCondition>;

export type PaymentResult = ReturnType<typeof validateConfig>;
