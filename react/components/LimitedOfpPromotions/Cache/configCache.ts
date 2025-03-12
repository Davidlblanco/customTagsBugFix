import { canUseDOM } from 'vtex.render-runtime'

import type { ConfigStorage } from '../Types/configType'

export const setWithExpiry = (
  key: string,
  value: any,
  ttlInMilliseconds: number
): void => {
  if (!canUseDOM) return

  const now = new Date()
  const item = {
    value,
    expiry: now.getTime() + ttlInMilliseconds,
  }

  localStorage.setItem(key, JSON.stringify(item))
}

export const getWithExpiry = (key: string): ConfigStorage | undefined => {
  if (!canUseDOM) return

  const itemStr = localStorage.getItem(key)

  if (!itemStr) {
    return
  }

  const item = JSON.parse(itemStr)
  const nowTime = new Date().getTime()

  if (nowTime > item.expiry) {
    localStorage.removeItem(key)

    return
  }

  const remainingMillisecondsExpire = item.expiry - nowTime

  return { remainingMillisecondsExpire, value: item.value }
}
