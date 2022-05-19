import React, { useEffect, useState } from "react";
import waitForEl from "../../utils/waitForEl";
import styles from "./index.css";
import { useOrderForm } from "vtex.order-manager/OrderForm";

/**
 * @example
 * arraysEqual([{productId: '10'}], [{productId: '10'}]); // Return true;
 *
 * @param array1  {any[]} obrigatorio - Array 1, a ordem dos parametos independe
 * @param  array2 {any[]} obrigatorio - Array 2, a ordem dos parametos independe
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
 * @param items_main  {any[]} obrigatorio - Array de items que vai ser percorrido (deve ser o de maior tamanho)
 * @param  items_secondary {any[]} obrigatorio - Array de items que vai ser comparado (deve ser o de menor tamanho)
 * @returns item_id {String}
 */
function whoItemIsDifferent(items_main: any[], items_secondary: any[]): String {
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
            itemDifferent = item_main.productId;
            return;
        }
    });

    return itemDifferent;
}

// /**
//  * @example
//  * whoItemQuantityChanged([{productId: '10'}, {productId: '20'}], [{productId: '10'}]); // Return '20';
//  *
//  * @param items  {any[]} obrigatorio - Array de items atual (deve ser o de maior tamanho)
//  * @param  previous_items {any[]} obrigatorio - Array de items que vai ser comparado (deve ser o de menor tamanho)
//  * @returns item_id {String}
//  */
// function whoItemQuantityChanged(
//     items: any[],
//     previous_items: any[]
// ): String {
//     let itemDifferent = "";

//     items.forEach(item_main => {
//         let isDiff = true;

//         items_secondary.forEach(item_secondary => {
//             if (item_main.productId == item_secondary.productId) {
//                 isDiff = false;
//                 return;
//             }
//         });

//         if (isDiff == true) {
//             itemDifferent = item_main.productId;
//             return;
//         }
//     });

//     return itemDifferent;
// }

const PrecioLive = () => {
    const [inserted, setInserted] = useState(false);
    const [previousItems, setPreviousItems] = useState<null | any[]>(null);
    const {
        orderForm: { items, customData }
    } = useOrderForm();

    useEffect(() => {
        console.log("items: ", items, customData);
        if (previousItems == null) setPreviousItems(items);
        else {
            if (arraysEqual(previousItems, items)) return;

            if (previousItems.length > items.length) {
                //First case: item removed to order
                const itemIdRemoved = whoItemIsDifferent(previousItems, items);
                console.log("productIdRemoved: ", itemIdRemoved);
            } else if (previousItems.length < items.length) {
                //Second case: item added to order
                const itemIdAdded = whoItemIsDifferent(items, previousItems);
                console.log("productIdAdded: ", itemIdAdded);
            } else {
                //Third case: Some item change the quantity
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
