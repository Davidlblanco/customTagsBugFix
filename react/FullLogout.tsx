import React, { useEffect } from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import waitForSingleEl from "./utils/waitForSingleEl";

export default function FullLogout() {
  const { orderForm } = useOrderForm();
  const orderFormId = orderForm?.id;

  useEffect(() => {
    if (!canUseDOM) {
      return;
    }

    waitForSingleEl('.vtex-login-2-x-accountOptions .vtex-button.hover-bg-action-secondary').then((logoutBtn) => {
      const callback = () => {
        fetch(`/checkout/changeToAnonymousUser/${orderFormId}`)
      };
      logoutBtn.addEventListener("click", callback);
    })

  });

  return <></>;
}
