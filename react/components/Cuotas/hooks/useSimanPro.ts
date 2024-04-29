import { useEffect, useState, useMemo } from "react";
import { useProduct } from "vtex.product-context";
import addEventOnTarget from "../../../helpers/addEventOnTarget";

export default function UseSimanPro() {
   const [selected, setSelected] = useState<SimanProData[]>([]);
   const productContext = useProduct();
   const isAvailable = !!productContext?.product?.properties.some((item) => item.name === "Siman Pro");
   const total = useMemo(() => selected.reduce((acc, item) => acc + item.price * item.quantity, 0), [selected]);
   const isActive = useMemo(() => selected.some((item) => item.quantity >= 1), [selected]);

   useEffect(() => {
      if (!isAvailable) return;

      // --- Get initial value ---
      setSelected(getSimanProData());

      // --- Listen to input changes ---
      addEventOnTarget("change", 'input[name="garantia"]', () => {
         setSelected(getSimanProData());
      });
      addEventOnTarget("change", 'select[name="quantidadeGarantia"]', () => {
         setSelected(getSimanProData());
      });
   }, [isAvailable]);

   useEffect(() => {
      // The simanPro elements takes some time to be rendered, so we need to wait a little bit
      const id = setTimeout(() => {
         setSelected(getSimanProData());
      }, 250);

      // --- Cleanup ---
      return () => {
         clearTimeout(id);
      };
   }, [productContext?.selectedQuantity]); // The simanpro elements resets after the product quantity changes, so we need to check again after that

   return {
      isAvailable,
      isActive,
      total,
      selected,
   };
}

interface SimanProData {
   months: number;
   price: number;
   quantity: number;
   isWithoutWarranty: boolean;
}

// --- Helpers ---

function getSimanProData() {
   const data: SimanProData[] = [];
   const checkedElements = document.querySelectorAll<HTMLInputElement>('input[name="garantia"]:checked');

   checkedElements.forEach((el) => {
      data.push(extractData(el));
   });

   return data;
}

function addZero(num) {
   const price = num.toString().split('.')[1];
   console.log(price, num)
   if (price?.length === 1) {
       return Number(num).toFixed(2);
   }

   return num.toString();
}

function extractData(element: HTMLInputElement): SimanProData {
   const data = element.dataset.warranty?.split("-");
   const months = Number(data?.[0] ?? 0);

   let price = addZero(data?.[1] ?? 0)
   price = Number(price.replace(".", ""))
   
   const isWithoutWarranty = months === 0;

   let quantity = isWithoutWarranty ? 0 : 1;
   const quantityEl = element.parentElement?.querySelector("select");
   if (quantityEl) {
      quantity = Number(quantityEl.value);
   }

   return {
      months,
      price,
      quantity,
      isWithoutWarranty,
   };
}
