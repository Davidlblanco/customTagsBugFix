import React, { useEffect } from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useOrderForm } from "vtex.order-manager/OrderForm";

export default function FullLogout() {
    const { orderForm } = useOrderForm();
    const orderFormId = orderForm?.id;

    useEffect(() => {
        if (!canUseDOM) {
            return;
        }
        const callback = async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const LogoutBtnSelector = ".vtex-login-2-x-accountOptions .b--muted-4 .vtex-button.c-action-primary,.vtex-login-2-x-accountOptions .b--muted-4 .vtex-button.c-action-primary *"
            if (
                target?.matches(
                  LogoutBtnSelector
                )
            ) {
                await fetch(`/checkout/changeToAnonymousUser/${orderFormId}`)
            }
        };

        document.addEventListener("click", callback);
        return () => document.removeEventListener("click", callback);
    }, [orderFormId]);

    return <></>;
}
