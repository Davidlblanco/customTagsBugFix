import { canUseDOM } from 'vtex.render-runtime'

export const GetPageType = (): string => {
  let pageType = ''

  if (canUseDOM) {
    const renderContainer = document.querySelector('.render-container')

    if (renderContainer) {
      Array.from(renderContainer.classList).forEach((el) => {
        const splitClass = el.split('-')

        pageType = splitClass[splitClass.length - 1]
      })
    }
  }

  return pageType
}
