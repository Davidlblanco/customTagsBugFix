import { canUseDOM } from "vtex.render-runtime";
import { PaymentResult } from "../../Cuotas/Logic/PaymentCustomValidators";

export type CredisimanCuotasStorage = {
  remainingMillisecondsExpire: number;
  value: Record<string, PaymentResult['bestInstallment']>
}

export const getCacheCredisimanCoutas = (key: string): CredisimanCuotasStorage | undefined => {
  if (!canUseDOM) return;

  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
     return;
  }

  const item = JSON.parse(itemStr);
  const nowTime = new Date().getTime();

  if (nowTime > item.expiry) {
     localStorage.removeItem(key);
     return;
  }

  const remainingMillisecondsExpire = item.expiry - nowTime 

  return {
    remainingMillisecondsExpire, 
    value: item.value 
  };
};
