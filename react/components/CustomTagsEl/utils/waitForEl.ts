export const waitForEl = (
  selector: string,
  timeout = 100,
  enableMaxRetry = false,
  maxRetries = 50
): Promise<NodeListOf<Element> | null> => {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const interval = setInterval(() => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        clearInterval(interval);
        resolve(elements);
      } else if (enableMaxRetry && retries >= maxRetries) {
        clearInterval(interval);
        reject(new Error("Max retries reached"));
      }
      retries++;
    }, timeout);
  });
};
