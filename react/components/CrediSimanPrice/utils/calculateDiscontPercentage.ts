import { ConfigGroup } from "../Types/credisimanTypes";

export function calculateDiscountPercentage({ 
  type,
  totalWithCredisiman = 0, 
  listPrice = 0,
  discount,
}: { 
  type: ConfigGroup['configs']['percentageBasis'],
  totalWithCredisiman?: number, 
  listPrice?: number,
  discount: number,
}) {
  if (type === 'list-price') {
    const priceWithDiscount = listPrice - totalWithCredisiman;
    const discountPercentage = (priceWithDiscount / listPrice) * 100
    
    return `-${Math.round(discountPercentage)}%`;
  }

  return `-${discount}%`;
}