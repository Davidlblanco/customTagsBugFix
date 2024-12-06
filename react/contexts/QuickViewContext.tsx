import React, { useEffect, useState } from "react";
import axios from "axios";

import { ProductContextState } from "vtex.product-context/react/ProductTypes";
import { resolverCategory } from "../components/QuickView/utils/resolverCategory";

interface Props {
  readonly children: React.ReactNode;
}

interface ContextData {
  isLoading: boolean;
  categoryHasQuickview: (ctx: Partial<ProductContextState>) => boolean;
  onOpenChange: (productId: string, open: boolean) => void
  isOpen: { productId: string, open: boolean };
}

const initialData = {
  isLoading: true,
  categoryHasQuickview: () => false,
  onOpenChange: () => {},
  isOpen: { productId: '', open: false }
};

const Context = React.createContext<ContextData>(initialData);

export function QuickViewContextProvider({ children }: Props) {
  const [data, setData] = useState<{ 
    quickviews: QuickViewApi[], 
    isLoading: boolean 
  }>({ 
    quickviews: [], 
    isLoading: true 
  });
  const [isOpen, setIsOpen] = useState<{productId: string, open: boolean}>({ productId: '', open: false });

  function categoryHasQuickview(productContext: Partial<ProductContextState>) {
    if (!productContext) return false;
  
    const categories = resolverCategory(productContext.product?.categories ?? [])
    const isEnabledCategory = data.quickviews?.find(c => categories?.some(ct => ct === c.category.name.toLowerCase()))
    const childrenCategory = isEnabledCategory?.category?.children;
  
    if (!isEnabledCategory) return false;
    if (!isEnabledCategory.isActive) return false;
  
    if (
      childrenCategory?.length && 
      !childrenCategory.some(cc => categories?.some(ct => ct === cc.name.toLowerCase()))
    ) {
      return false;
    }

    return true;
  }

  function onOpenChange(productId: string, open: boolean) {
    setIsOpen({ productId, open });
  }

  useEffect(() => {
      async function fetchData() {
          const { data } = await axios.get(
              "/_v1/admin-quickview/quickviews"
          );
          setData({
              quickviews: data,
              isLoading: false,
          });
      }
      fetchData();
  }, []);

  return (
    <Context.Provider 
      value={{
        ...data,
        categoryHasQuickview,
        onOpenChange,
        isOpen,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useQuickView() {
    return React.useContext(Context);
}
