import React from "react";
import { Spinner } from "vtex.styleguide";

import CuotasPdp from "./components/CuotasPdp/CuotasPdp";
import CuotasProductSummary from "./components/CuotasProductSummary/CuotasProductSummary";

import useProductPayments from "./hooks/useProductPayments";
import useGenericTagStyles from "../../hooks/useGenericTagStyles";

import { GenericTagsFront } from "./Types/PaymentCustom";
import { Results } from "./Types/Results";
import { BestInstallment } from "./Types/BestInstallment";

import styles from "./Cuotas.css";

interface CuotasProps {
    visibility: VisibilityType;
    algoliaProductContext?: AlgoliaProductContext | undefined
}

const Cuotas = ({ visibility, algoliaProductContext }: CuotasProps) => {
    const { tagsPreview, isLoading: tagIsLoading } = useGenericTagStyles();
    const { isLoading, bestInstallment, results } = useProductPayments({
        paymentIds: [], // This filter is optional
        algoliaProductContext
    });

    if (isLoading || tagIsLoading) {
        return (
            <div className={styles.SpinnerContainer}>
                <Spinner />
            </div>
        );
    }

    const canRender = bestInstallment?.installment &&
        bestInstallment.installment > 1;

    if (!canRender || !tagsPreview?.tagIsActive) {
        return <></>;
    }

    const ComponentCuotas = componentConfig[visibility]?.el;

    return (
        <div className={`${styles.CuotasContainerNewpdp}`}>
            <ComponentCuotas
                tagsPreview={tagsPreview}
                results={results}
                bestInstallment={bestInstallment}
            />
        </div>
    );
};

const componentConfig: Record<VisibilityType, ComponentConfig> = {
    'pdp': { el: CuotasPdp },
    'product-summary': { el: CuotasProductSummary }
};

type VisibilityType = 'pdp' | 'product-summary';

interface ComponentProps {
    tagsPreview?: GenericTagsFront | null;
    results: Results[];
    bestInstallment: BestInstallment;
}

interface ComponentConfig {
    el: React.FC<ComponentProps>;
}

export { Cuotas };