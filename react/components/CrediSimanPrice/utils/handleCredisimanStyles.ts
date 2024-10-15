import axios from "axios";

export async function handleCredisimanStyles(promotionId?: string) {
  try {
    const { data } = await axios(`/_v/admin-credisiman-price/config/${promotionId}`)

    return data.configs

  } catch (error) {
    console.error(error);
  }
}