import { ConfigGroupPromotions } from "../../../typings/config";

export const filterTags = (configs: ConfigGroupPromotions[]): ConfigGroupPromotions[] => {
  const configsActives = configs?.filter((config) => config?.active === true);
  return configsActives;
};