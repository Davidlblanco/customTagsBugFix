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
    if (listPrice <= 0) {
      return discount ? `-${discount}%` : "0%";
    }
    const priceWithDiscount = listPrice - totalWithCredisiman;

    if (priceWithDiscount <= 0) {
      return "0%";
    }

    const discountPercentage = (priceWithDiscount / listPrice) * 100;
    return `-${Math.round(discountPercentage)}%`;
  }

  return discount ? `-${discount}%` : "0%";
}