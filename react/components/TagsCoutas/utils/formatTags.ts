import { TagCuotasValues } from "../../Cuotas/Types/PaymentCustom";

export const formatTags = (tags: TagCuotasValues[] | undefined | null) => {
  return tags?.map((value) => {
    const { tag } = value;
    const tagStyle = {
      ...tag?.tagDesign,
      borderStyle: "solid",
      borderWidth: "1px",
      padding: "5px 9px",
      lineHeight: "initial",
      fontWeight: 700,
      fontFamily: "Roboto",
    };
    return { tag, tagStyle };
  });
};