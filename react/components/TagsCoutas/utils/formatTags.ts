import { TagCuotasValues } from "../../Cuotas/Types/PaymentCustom";
import { CSSProperties } from 'react';

export const formatTags = (tags: TagCuotasValues[] | undefined | null) => {
  return tags?.map((value) => {
    const { tag } = value;
    const tagStyle: CSSProperties = {
      ...tag?.tagDesign,
      borderStyle: "solid",
      borderWidth: "1px",
      padding: "5px 6px",
      lineHeight: "initial",
      fontWeight: 700,
      fontFamily: "Roboto",
      minWidth: "68px",
      textAlign: "center"
    };
    return { tag, tagStyle };
  });
};