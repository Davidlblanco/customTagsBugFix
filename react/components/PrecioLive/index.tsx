import React, { useEffect, useState } from "react";
import waitForEl from "../../utils/waitForEl";
import styles from "./index.css";
import { useOrderForm } from "vtex.order-manager/OrderForm";

/**
 * @example
 * arraysEqual([{productId: '10'}], [{productId: '10'}]); // Return true;
 *
 * @param array1  {any[]} required - Array 1, a ordem dos parametos independe
 * @param  array2 {any[]} required - Array 2, a ordem dos parametos independe
 * @returns arrayIsEqual {boolean}
 */
function arraysEqual(array1: any[], array2: any[]): boolean {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(array1) == JSON.stringify(array2);
}

/**
 * @example
 * whoItemIsDifferent([{productId: '10'}, {productId: '20'}], [{productId: '10'}]); // Return '20';
 *
 * @param items_main  {any[]} required - Array de items que vai ser percorrido (deve ser o de maior tamanho)
 * @param  items_secondary {any[]} required - Array de items que vai ser comparado (deve ser o de menor tamanho)
 * @returns item_id {string}
 */
function whoItemIsDifferent(items_main: any[], items_secondary: any[]): string {
    let itemDifferent = "";

    items_main.forEach(item_main => {
        let isDiff = true;

        items_secondary.forEach(item_secondary => {
            if (item_main.productId == item_secondary.productId) {
                isDiff = false;
                return;
            }
        });

        if (isDiff == true) {
            itemDifferent = item_main.id;
            return;
        }
    });

    return itemDifferent;
}

/**
 * @example
 * whoItemQuantityChanged([{productId: '10', quantity: 2}, {productId: '20', quantity: 1}], [{productId: '10', quantity: 1}, {productId: '20', quantity: 1}]); // Return 0;
 *
 * @param items  {any[]} required - Array de items após a mudança de quantidade
 * @param  previous_items {any[]} required - Array de items antes da mudança de quantidade
 * @returns index on array of item that changed quantity {Number}
 */
function indexOfItemQuantityChanged(
    items: any[],
    previous_items: any[]
): number {
    let indexOfItem = -1;

    items.forEach((item_main, index) => {
        if (item_main.quantity != previous_items[index].quantity) {
            indexOfItem = index;
            return;
        }
    });

    return indexOfItem;
}

/**
 * @example
 * setPrecioLiveCustomData('xxxxxxxxxxxx11111', [{productId: '10'}]);
 *
 * @param orderFormId  {string} required - id of orderform
 * @param  items {any[]} required - items to set on custom data Precio Live
 */
function setPrecioLiveCustomData(orderFormId: string, items: any[]) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({ items: items })
    };

    console.log("Setando items : ", items);

    fetch(
        `/api/checkout/pub/orderForm/${orderFormId}/customData/preciolive`,
        options
    )
        .then(response => response.json())
        .then(response => console.log("Done!", response))
        .catch(err => console.error("Precio Live Custom Data error: ", err));
}

const PrecioLive = () => {
    const [inserted, setInserted] = useState(false);
    const [previousItems, setPreviousItems] = useState<null | any[]>(null);
    const {
        orderForm: { orderFormId, items, customData }
    } = useOrderForm();

    useEffect(() => {
        if (previousItems == null) setPreviousItems(items);
        else {
            if (arraysEqual(previousItems, items)) return;

            if (previousItems.length > items.length) {
                //First case: item removed to order
                const itemIdRemoved = whoItemIsDifferent(previousItems, items);
                removeItemOnCustomData(itemIdRemoved);
            } else if (previousItems.length < items.length) {
                //Second case: item added to order
                const itemIdAdded = whoItemIsDifferent(items, previousItems);
                addItemOnCustomData(itemIdAdded);
            } else {
                //Third case: Some item change the quantity
                const indexOfItemChanged = indexOfItemQuantityChanged(
                    items,
                    previousItems
                );
                const item = items[indexOfItemChanged],
                    previous_item = previousItems[indexOfItemChanged];

                if (item.quantity > previous_item.quantity) {
                    const productsNameElements = document.querySelectorAll(
                        ".vtex-product-summary-2-x-productBrand"
                    );
                    if (productsNameElements) {
                        const productsName = Array.from(
                            productsNameElements
                        ).map(el => el.textContent);
                        console.log("productsName : ", productsName);
                        console.log("item.skuName : ", item.skuName);
                        if (productsName.includes(item.skuName))
                            addItemOnCustomData(item.id);
                    }
                }
            }

            setPreviousItems(items);
        }
    }, [items]);

    useEffect(() => {
        if (!inserted) {
            setInserted(true);
            waitForEl(".vtex-product-price-1-x-sellingPrice", insertPrecioLive);
        }
    }, []);

    function addItemOnCustomData(productId: string) {
        console.log("productIdAdded: ", productId);
        console.log("customData: ", customData);
        let items: any[] = [],
            alreadyContainItem = false;

        if (customData) {
            const [precioLiveApp] = customData.customApps.filter(
                (app: any) => app.id == "preciolive"
            );

            if (precioLiveApp) {
                alreadyContainItem = precioLiveApp.fields.items.includes(
                    productId
                );

                if (alreadyContainItem) return;
                else items = precioLiveApp.fields.items;
            }
        }

        items.push(productId);

        setPrecioLiveCustomData(orderFormId, items);
    }

    function removeItemOnCustomData(productId: string) {
        console.log("productIdRemoved: ", productId);
        console.log("customData: ", customData);
        let items: any[] = [],
            alreadyContainItem = false;

        if (customData) {
            const [precioLiveApp] = customData.customApps.filter(
                (app: any) => app.id == "preciolive"
            );

            if (precioLiveApp) {
                alreadyContainItem = precioLiveApp.fields.items.includes(
                    productId
                );

                if (alreadyContainItem) {
                    precioLiveApp.fields.items.forEach((item: any) => {
                        if (item.id != productId) items.push(item);
                    });
                }
            }
            setPrecioLiveCustomData(orderFormId, items);
        }
    }

    const insertPrecioLive = (elements: any) => {
        Array.from(elements).map((el: any) => {
            const span = document.createElement("span");
            span.innerText = "Precio Live";
            span.classList.add(styles["precio-live"]);
            el.append(span);
        });
    };

    return <> tests </>;
};

export default PrecioLive;
