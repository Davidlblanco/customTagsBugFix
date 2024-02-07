import { canUseDOM } from "vtex.render-runtime";

const GetPageType = (): string => {
   let pageType: string = "";

   if (canUseDOM) {
      const renderContainer = document.querySelector(".render-container");

      if (renderContainer) {
         Array.from(renderContainer.classList).forEach((el) => {
            let splitClass = el.split("-");
            pageType = splitClass[splitClass.length - 1];
         });
      }
   }

   return pageType;
};

export default GetPageType;
