import React from "react";
// import { useQuickView } from "../../contexts/QuickViewContext";
import { QuickViewModal } from "./QuickViewModal";

interface QuickViewProps {
  children: React.ReactNode[]
}

export function QuickView({ children }: QuickViewProps) {
  // const { quickviews } = useQuickView()

  return <QuickViewModal 
    images={children[0]} 
    skuSelector={children[1]} 
    addToCart={children[2]}
  />
}
