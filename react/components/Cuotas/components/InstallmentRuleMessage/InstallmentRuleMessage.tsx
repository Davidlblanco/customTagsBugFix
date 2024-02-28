import React, { useMemo } from "react";
import {
    InstallmentResult,
    RuleResult,
} from "../../Logic/PaymentCustomValidators";
import styles from "./styles.css";
import BrandName from "../BrandName/BrandName";
import ElementList from "../ElementList/ElementList";
import CategoryName from "../CategoryName/CategoryName";
import CollectionName from "../CollectionName/CollectionName";

export default function InstallmentRuleMessage({ installment }: Props) {
    const message = useMemo(() => {
        const rule = getRuleByPriority(installment.rulesResults);
        return rule ? ruleMessages[rule.type](rule.ruleValue) : <></>;
    }, [installment]);

    return (
        <p className={styles.OtherPaymentsSubtitle}>
            Hasta {installment?.installment} cuotas {message}
        </p>
    );
}

function getRuleByPriority(rules: RuleResult[] | undefined) {
    const rulesPriority = [
        "simanpro",
        "sku_id",
        "sku_brand",
        "sku_category",
        "sku_collection",
    ];

    const validRules = rules?.filter(
        (rule) => rule.valid && rule.operator === "="
    ); // This ignores rules with operator "!=" (eg: "is not form cateogry x", "is not from brand y")

    // Iterate over the priority array and return the first rule that matches
    for (const item of rulesPriority) {
        const rule = validRules?.find((rule) => rule.type === item);
        if (rule) return rule;
    }

    return null;
}

const ruleMessages = {
    sku_category: (categories: string[]) => {
        const plural = categories.length > 1;
        const showTextForMoreItems = categories.length > 4;
        const categoryNames = categories.map((category) => (
            <CategoryName id={category} />
        ));

        return (
            <>
                en tu compra de tus productos de{" "}
                {plural ? "las categorías" : "la categoría"}{" "}
                <ElementList elements={categoryNames} />{" "}
                {showTextForMoreItems ? "y otras categorías" : ""}.
            </>
        );
    },
    sku_brand: (brands: string[]) => {
        const plural = brands.length > 1;
        const showTextForMoreItems = brands.length > 4;
        const brandNames = brands.map((brand) => <BrandName id={brand} />);

        return (
            <>
                en tu compra de tus productos de{" "}
                {plural ? "las marcas" : "la marca"}{" "}
                <ElementList elements={brandNames} />{" "}
                {showTextForMoreItems ? "y otras marcas" : ""}.
            </>
        );
    },
    simanpro: () => (
        <>
            al contratar <span className={styles.highlight}>SIMAN PRO*</span>
        </>
    ),
    sku_id: () => <>en la compra de este producto.</>,
    sku_collection: (collections: string[]) => {
        const plural = collections.length > 1;
        const showTextForMoreItems = collections.length > 4;
        const collectionNames = collections.map((collection) => (
            <CollectionName id={collection} />
        ));

        return (
            <>
                en tu compra de tus productos de{" "}
                {plural ? "las colecciones" : "la colección"}{" "}
                <ElementList elements={collectionNames} />{" "}
                {showTextForMoreItems ? "y otras colecciones" : ""}.
            </>
        );
    },
};

interface Props {
    installment: InstallmentResult;
}
