export function resolverCategory(categories: string[]) {
  const processedCategories = categories.flatMap((category) => {
    const parts = category.toLowerCase().replace(/^\/|\/$/g, "").split("/");
    return parts;
  });
  
 return Array.from(new Set(processedCategories));
}
