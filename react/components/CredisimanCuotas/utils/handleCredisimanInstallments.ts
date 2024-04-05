import { canUseDOM } from "vtex.render-runtime";
import useProductPayments from "../../Cuotas/hooks/useProductPayments";
import { CredisimanCuotasStorage, getCacheCredisimanCoutas } from "../cache/coutas";
import { minutesToExpiryCache } from "../../CrediSimanPrice/Config/constants";
import { setWithExpiry } from "../../CrediSimanPrice/Cache/crediSimanCache";
import { useProduct } from "vtex.product-context";

export function handleCredisimanInstallments() {
  if (!canUseDOM) return {
    isLoading: false,
    credisiman: null,
  }

  const productCtx = useProduct();
  const selectedItem = productCtx?.selectedItem?.itemId

  const credisimanStorage: CredisimanCuotasStorage | undefined = getCacheCredisimanCoutas("credisiman-cuotas");
  const allInstallments = credisimanStorage?.value ?? {};
  const cuotasInCache = allInstallments[selectedItem ?? '']

  if (!cuotasInCache) {
    const { isLoading, bestInstallment, skuId } = useProductPayments({
      paymentIds: ["401","403"], // This filter is optional
    });
    
    if (bestInstallment) {
      const expiryTime = credisimanStorage?.remainingMillisecondsExpire ??
        minutesToExpiryCache * 60 * 1000;

      allInstallments[skuId ?? ''] = bestInstallment;
      
      setWithExpiry('credisiman-cuotas', allInstallments, expiryTime);
      
      return {
        isLoading,
        credisiman: bestInstallment,
      }
    }

    return {
      isLoading,
      credisiman: null,
    }
    
  } else {
    return {
      isLoading: false,
      credisiman: cuotasInCache,
    };
  }
}

