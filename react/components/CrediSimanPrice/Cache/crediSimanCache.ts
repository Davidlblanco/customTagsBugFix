import { canUseDOM } from "vtex.render-runtime";

export const setWithExpiry = (key: string, value: any, ttl: number): void => {
   if (!canUseDOM) return;

   const now = new Date();
   const item = {
      value: value,
      expiry: now.getTime() + ttl * 60 * 1000,
   };
   localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key: string): any => {
   if (!canUseDOM) return;

   const itemStr = localStorage.getItem(key);
   if (!itemStr) {
      return null;
   }
   const item = JSON.parse(itemStr);
   const now = new Date();
   if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
   }
   return item.value;
};
